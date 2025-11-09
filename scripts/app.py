import json
import os
import sys

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

from ollama_client import OllamaClient, test_connection

class RoadSafetyGPT:
    def __init__(self):
        self.client = OllamaClient()
        self.database = self.load_database()
        self.system_prompt = self.load_system_prompt()
    
    def load_database(self):
        """Load the processed interventions database"""
        try:
            with open('data/processed_database.json', 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            print("Error: Processed database not found. Please run database_processor.py first.")
            sys.exit(1)
    
    def load_system_prompt(self):
        """Load the system prompt"""
        try:
            with open('prompts/system_prompt.txt', 'r', encoding='utf-8') as f:
                return f.read()
        except FileNotFoundError:
            print("Error: System prompt not found.")
            sys.exit(1)
    
    def prepare_database_context(self):
        """Prepare the database context for the AI"""
        context = "ROAD SAFETY INTERVENTIONS DATABASE:\n\n"
        
        for intervention in self.database:
            context += f"ID: {intervention['intervention_id']}\n"
            context += f"Problem Type: {intervention['problem_type']}\n"
            context += f"Category: {intervention['category']}\n"
            context += f"Intervention: {intervention['intervention_name']}\n"
            context += f"Description: {intervention['description'][:300]}...\n"  # First 300 chars
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
    
    def run(self):
        """Main application loop"""
        print("=" * 60)
        print("🚦 ROAD SAFETY INTERVENTION GPT")
        print("=" * 60)
        print(f"Loaded {len(self.database)} interventions from database")
        print("Type 'quit' to exit\n")
        if not test_connection():
            print("\nPlease start Ollama with: ollama serve")
            print("And make sure mistral model is pulled: ollama pull mistral")
            return
        
        database_context = self.prepare_database_context()
        
        while True:
            user_input = input("\nDescribe the road safety problem: ").strip()
            
            if user_input.lower() in ['quit', 'exit', 'q']:
                print("Thank you for using Road Safety GPT!")
                break
            
            if not user_input:
                continue
            
            print("\n" + "=" * 40)
            print("Analyzing your road safety issue...")
            print("=" * 40)
            response = self.client.query_road_safety(
                user_input, 
                database_context, 
                self.system_prompt
            )
            
            print("\n💡 RECOMMENDED INTERVENTIONS:")
            print("=" * 40)
            print(response)
            print("\n" + "=" * 40)
            print("QUICK KEYWORD MATCHES:")
            print("=" * 40)
            keyword_matches = self.search_interventions(user_input)
            if keyword_matches:
                for i, match in enumerate(keyword_matches, 1):
                    print(f"{i}. {match['intervention_name']} ({match['category']})")
                    print(f"   Problem: {match['problem_type']}")
                    print(f"   Standard: {match['standard_code']} {match['clause']}")
                    print()
            else:
                print("No direct keyword matches found.")

if __name__ == "__main__":
    app = RoadSafetyGPT()
    app.run()