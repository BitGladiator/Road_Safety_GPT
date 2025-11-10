from flask import Flask, render_template, request, jsonify, session
import json
import os
import sys
from datetime import datetime
import secrets

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

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
            db_path = os.path.join(parent_dir, 'data', 'processed_database.json')
            with open(db_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            print("Error: Processed database not found.")
            return []
    
    def load_system_prompt(self):
        """Load the system prompt"""
        try:
            prompt_path = os.path.join(parent_dir, 'prompts', 'system_prompt.txt')
            with open(prompt_path, 'r', encoding='utf-8') as f:
                return f.read()
        except FileNotFoundError:
            return "You are a Road Safety Expert AI assistant."
    
    def prepare_database_context(self, user_query=""):
        """Prepare focused database context for the AI"""
        # Get relevant interventions based on query
        keyword_matches = self.search_interventions(user_query)
        relevant_interventions = keyword_matches[:5] if keyword_matches else self.database[:8]
        
        context = "RELEVANT ROAD SAFETY INTERVENTIONS:\n\n"
        
        for intervention in relevant_interventions:
            context += f"🔹 {intervention['intervention_name']}\n"
            context += f"   Problem Type: {intervention['problem_type']}\n"
            context += f"   Category: {intervention['category']}\n"
            context += f"   Standard: {intervention['standard_code']} Clause {intervention['clause']}\n"
            
            # Include full description for better context
            context += f"   Description: {intervention['description']}\n"
            context += "─" * 50 + "\n"
        
        return context
    
    def search_interventions(self, user_query):
        """Improved keyword-based search - FIXED INDENTATION"""
        query_lower = user_query.lower()
        matches = []
        
        for intervention in self.database:
            score = 0
            
            # Exact problem type match (highest priority)
            if intervention['problem_type'].lower() in query_lower:
                score += 10
            
            # Intervention name match
            if intervention['intervention_name'].lower() in query_lower:
                score += 8
            
            # Category match
            if intervention['category'].lower() in query_lower:
                score += 5
            
            # Keyword matches
            for keyword in intervention['keywords']:
                if keyword.lower() in query_lower:
                    score += 2
            
            # Road type match
            for road_type in intervention['road_types']:
                if road_type.lower() in query_lower:
                    score += 3
            
            # Environment match
            for env in intervention['environments']:
                if env.lower() in query_lower:
                    score += 3
            
            if score > 0:
                matches.append((score, intervention))
        
        # FIXED: This was inside the loop!
        matches.sort(key=lambda x: x[0], reverse=True)
        return [match[1] for match in matches]
    
    def get_response(self, user_query):
        """Get AI response for user query - FIXED LOGIC"""
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

road_safety_gpt = RoadSafetyGPT()

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

if __name__ == '__main__':
    print("=" * 60)
    print("🚦 ROAD SAFETY INTERVENTION GPT - Web Interface")
    print("=" * 60)
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