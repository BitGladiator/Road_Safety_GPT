from flask import Flask, render_template, request, jsonify, session
import json
import os
import sys
from datetime import datetime
import secrets

current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

from scripts.ollama_client import OllamaClient, test_connection

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)

class RoadSafetyGPT:
    def __init__(self):
        self.client = OllamaClient()
        self.database = self.load_database()
        self.system_prompt = self.load_system_prompt()
    
    def load_database(self):
        """Load the processed interventions database"""
        try:
            db_path = os.path.join(current_dir, 'data', 'processed_database.json')
            print(f"Looking for database at: {db_path}")
            print(f"File exists: {os.path.exists(db_path)}")
            
            with open(db_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            print("Error: Processed database not found.")
            print(f"Expected at: {db_path}")
            print("Please check if the file exists at this location.")
            return []
    
    def load_system_prompt(self):
        """Load the system prompt"""
        try:
            prompt_path = os.path.join(current_dir, 'prompts', 'system_prompt.txt')
            print(f"Looking for system prompt at: {prompt_path}")
            
            with open(prompt_path, 'r', encoding='utf-8') as f:
                return f.read()
        except FileNotFoundError:
            print("Warning: System prompt not found, using default")
            return "You are a Road Safety Expert AI assistant."
    
    def prepare_database_context(self, user_query=""):
        """Prepare focused database context for the AI"""
        keyword_matches = self.search_interventions(user_query)
        relevant_interventions = keyword_matches[:5] if keyword_matches else self.database[:8]
        
        context = "RELEVANT ROAD SAFETY INTERVENTIONS:\n\n"
        
        for intervention in relevant_interventions:
            context += f"{intervention['intervention_name']}\n"
            context += f"   Problem Type: {intervention['problem_type']}\n"
            context += f"   Category: {intervention['category']}\n"
            context += f"   Standard: {intervention['standard_code']} Clause {intervention['clause']}\n"
            context += f"   Description: {intervention['description']}\n"
            context += "─" * 50 + "\n"
        
        return context
    
    def search_interventions(self, user_query):
        """Improved keyword-based search"""
        query_lower = user_query.lower()
        matches = []
        
        for intervention in self.database:
            score = 0
            
            if intervention['problem_type'].lower() in query_lower:
                score += 10
            
            if intervention['intervention_name'].lower() in query_lower:
                score += 8
            
            if intervention['category'].lower() in query_lower:
                score += 5
            
            for keyword in intervention['keywords']:
                if keyword.lower() in query_lower:
                    score += 2
            
            for road_type in intervention['road_types']:
                if road_type.lower() in query_lower:
                    score += 3
            for env in intervention['environments']:
                if env.lower() in query_lower:
                    score += 3
            
            if score > 0:
                matches.append((score, intervention))
        
        matches.sort(key=lambda x: x[0], reverse=True)
        return [match[1] for match in matches]
    
    def get_response(self, user_query):
        """Get AI response for user query"""
        keyword_matches = self.search_interventions(user_query)
        focused_context = self.prepare_database_context(user_query)
        response = self.client.query_road_safety(
            user_query, 
            focused_context, 
            self.system_prompt
        )
        
        return {
            'ai_response': response,
            'keyword_matches': keyword_matches[:3]  
        }


import sqlite3
from datetime import datetime, date

class Analytics:
    def __init__(self, road_safety_gpt):
        self.road_safety_gpt = road_safety_gpt
        self.db_path = os.path.join(current_dir, 'data', 'analytics.db')
        self.init_database()
    
    def init_database(self):
        """Initialize SQLite database for analytics"""
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user_queries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_query TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                matched_interventions_count INTEGER,
                response_time FLOAT
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS query_interventions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                query_id INTEGER,
                intervention_id TEXT,
                intervention_name TEXT,
                problem_type TEXT,
                category TEXT,
                match_score INTEGER,
                FOREIGN KEY (query_id) REFERENCES user_queries (id)
            )
        ''')
        conn.commit()
        conn.close()
    
    def log_query(self, user_query, matched_interventions, response_time):
        """Log each user query and matched interventions from your main database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO user_queries (user_query, matched_interventions_count, response_time)
            VALUES (?, ?, ?)
        ''', (user_query, len(matched_interventions), response_time))
        
        query_id = cursor.lastrowid
    
        for intervention in matched_interventions:
            cursor.execute('''
                INSERT INTO query_interventions (query_id, intervention_id, intervention_name, problem_type, category)
                VALUES (?, ?, ?, ?, ?)
            ''', (query_id, 
                  intervention.get('intervention_id', ''),
                  intervention.get('intervention_name', ''),
                  intervention.get('problem_type', ''),
                  intervention.get('category', '')))
        
        conn.commit()
        conn.close()
    
    def get_dashboard_stats(self):
        """Get analytics based on your actual interventions database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cursor.execute('SELECT COUNT(*) FROM user_queries')
        total_reports = cursor.fetchone()[0]
    
        cursor.execute('''
            SELECT problem_type, COUNT(*) as count 
            FROM query_interventions 
            GROUP BY problem_type 
            ORDER BY count DESC 
            LIMIT 5
        ''')
        top_problems = [{'problem_type': row[0], 'count': row[1]} for row in cursor.fetchall()]
        
        cursor.execute('''
            SELECT category, COUNT(*) as count 
            FROM query_interventions 
            GROUP BY category 
            ORDER BY count DESC 
            LIMIT 5
        ''')
        top_categories = [{'category': row[0], 'count': row[1]} for row in cursor.fetchall()]
        
        cursor.execute('''
            SELECT intervention_name, COUNT(*) as count 
            FROM query_interventions 
            GROUP BY intervention_name 
            ORDER BY count DESC 
            LIMIT 10
        ''')
        top_interventions = [{'intervention': row[0], 'count': row[1]} for row in cursor.fetchall()]
        
        cursor.execute('''
            SELECT DATE(timestamp) as date, COUNT(*) as count 
            FROM user_queries 
            WHERE timestamp >= date('now', '-7 days')
            GROUP BY DATE(timestamp) 
            ORDER BY date
        ''')
        daily_reports = [{'date': row[0], 'count': row[1]} for row in cursor.fetchall()]
        
        cursor.execute('''
            SELECT user_query, COUNT(*) as count 
            FROM user_queries 
            GROUP BY user_query 
            ORDER BY count DESC 
            LIMIT 10
        ''')
        common_issues = [{'issue': row[0], 'count': row[1]} for row in cursor.fetchall()]
        
        conn.close()
        
        return {
            'total_reports': total_reports,
            'top_problems': top_problems,
            'top_categories': top_categories,
            'top_interventions': top_interventions,
            'daily_reports': daily_reports,
            'common_issues': common_issues,
            'total_interventions_in_db': len(self.road_safety_gpt.database) 
        }
road_safety_gpt = RoadSafetyGPT()
analytics = Analytics(road_safety_gpt)
@app.route('/')
def index():
    """Render the main chat interface"""
    if 'chat_history' not in session:
        session['chat_history'] = []
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat requests"""
    try:
        start_time = datetime.now()
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Empty message'}), 400
    
        result = road_safety_gpt.get_response(user_message)
        response_text = result['ai_response']
        
        if result['keyword_matches']:
            response_text += "\n\n**Quick Reference Matches:**\n"
            for i, match in enumerate(result['keyword_matches'], 1):
                response_text += f"\n{i}. **{match['intervention_name']}** ({match['category']})\n"
                response_text += f"   - Problem: {match['problem_type']}\n"
                response_text += f"   - Standard: {match['standard_code']} {match['clause']}\n"
        
       
        response_time = (datetime.now() - start_time).total_seconds()
        analytics.log_query(user_message, result['keyword_matches'], response_time)
        
        if 'chat_history' not in session:
            session['chat_history'] = []
        
        session['chat_history'].append({
            'user': user_message,
            'assistant': response_text,
            'timestamp': datetime.now().isoformat()
        })
        session.modified = True
        
        return jsonify({
            'response': response_text,
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route('/api/clear', methods=['POST'])
def clear_chat():
    """Clear chat history"""
    session['chat_history'] = []
    session.modified = True
    return jsonify({'status': 'success'})

@app.route('/api/history', methods=['GET'])
def get_history():
    """Get chat history"""
    history = session.get('chat_history', [])
    return jsonify({'history': history})

@app.route('/api/status', methods=['GET'])
def status():
    """Check system status"""
    ollama_status = test_connection()
    return jsonify({
        'ollama_connected': ollama_status,
        'database_loaded': len(road_safety_gpt.database) > 0,
        'intervention_count': len(road_safety_gpt.database)
    })

@app.route('/api/debug', methods=['POST'])
def debug_query():
    """Debug endpoint to see what the AI receives"""
    data = request.get_json()
    user_message = data.get('message', '').strip()
    
    database_context = road_safety_gpt.prepare_database_context(user_message)
    keyword_matches = road_safety_gpt.search_interventions(user_message)
    
    return jsonify({
        'user_query': user_message,
        'database_context_preview': database_context[:500] + "..." if len(database_context) > 500 else database_context,
        'keyword_matches_count': len(keyword_matches),
        'keyword_matches_sample': [match['intervention_name'] for match in keyword_matches[:3]] if keyword_matches else []
    })
@app.route('/api/analytics/dashboard')
def get_dashboard_stats():
    """Get dashboard statistics based on YOUR interventions database"""
    stats = analytics.get_dashboard_stats()
    return jsonify(stats)

@app.route('/api/analytics/interventions-usage')
def get_interventions_usage():
    """Get how often interventions from YOUR database are being recommended"""
    conn = sqlite3.connect(analytics.db_path)
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT 
            qi.intervention_name,
            qi.problem_type,
            qi.category,
            COUNT(*) as usage_count,
            i.description as intervention_description
        FROM query_interventions qi
        GROUP BY qi.intervention_name, qi.problem_type, qi.category
        ORDER BY usage_count DESC
        LIMIT 15
    ''')
    
    interventions_usage = []
    for row in cursor.fetchall():
        interventions_usage.append({
            'intervention_name': row[0],
            'problem_type': row[1],
            'category': row[2],
            'usage_count': row[3],
            'description': row[4] if row[4] else "No description available"
        })
    
    conn.close()
    return jsonify({'interventions_usage': interventions_usage})

if __name__ == '__main__':
    print("=" * 60)
    print("🚦 ROAD SAFETY INTERVENTION GPT - Web Interface")
    print("=" * 60)
    print(f"Current directory: {current_dir}")
    print(f"Database path: {os.path.join(current_dir, 'data', 'processed_database.json')}")
    print(f"Loaded {len(road_safety_gpt.database)} interventions from database")
    
    if test_connection():
        print("✓ Ollama connection successful")
        print("\nStarting Flask server...")
        print("Access the app at: http://localhost:5500")
        print("=" * 60)
        app.run(debug=True, host='0.0.0.0', port=5500)
    else:
        print("\nError: Cannot connect to Ollama")
        print("Please start Ollama with: ollama serve")
        print("And make sure phi3:mini model is pulled: ollama pull phi3:mini")