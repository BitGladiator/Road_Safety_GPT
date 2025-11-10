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
    
    def prepare_database_context(self):
        """Prepare the database context for the AI"""
        context = "ROAD SAFETY INTERVENTIONS DATABASE:\n\n"
        
        for intervention in self.database:
            context += f"ID: {intervention['intervention_id']}\n"
            context += f"Problem Type: {intervention['problem_type']}\n"
            context += f"Category: {intervention['category']}\n"
            context += f"Intervention: {intervention['intervention_name']}\n"
            context += f"Description: {intervention['description'][:300]}...\n"
            context += f"Standard: {intervention['standard_code']} Clause {intervention['clause']}\n"
            context += f"Road Types: {', '.join(intervention['road_types'])}\n"
            context += f"Environments: {', '.join(intervention['environments'])}\n"
            context += "-" * 50 + "\n"
        
        return context
    
    def search_interventions(self, user_query):
        """Simple keyword-based search as fallback"""
        query_lower = user_query.lower()
        matches = []
        
        for intervention in self.database:
            score = 0
            if intervention['problem_type'].lower() in query_lower:
                score += 3
            for keyword in intervention['keywords']:
                if keyword in query_lower:
                    score += 1
            if intervention['intervention_name'].lower() in query_lower:
                score += 2
            
            if score > 0:
                matches.append((score, intervention))
        
        matches.sort(key=lambda x: x[0], reverse=True)
        return [match[1] for match in matches[:3]]
    
    def get_response(self, user_query):
        """Get AI response for user query"""
        database_context = self.prepare_database_context()
        
        response = self.client.query_road_safety(
            user_query, 
            database_context, 
            self.system_prompt
        )
        keyword_matches = self.search_interventions(user_query)
        
        return {
            'ai_response': response,
            'keyword_matches': keyword_matches
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
        print("And make sure mistral model is pulled: ollama pull mistral")