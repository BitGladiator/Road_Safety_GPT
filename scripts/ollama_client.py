import requests
import json

class OllamaClient:
    def __init__(self, base_url="http://localhost:11434"):
        self.base_url = base_url
        self.model = "phi3:mini"
    
    def query_road_safety(self, user_query, database_context, system_prompt):
        """
        Send query to Ollama with road safety context
        """
        # Prepare the full prompt
        full_prompt = f"""
{database_context}

USER QUERY: {user_query}

Please analyze the road safety problem and recommend appropriate interventions from the database above.
"""
        
        try:
            response = requests.post(
                f"{self.base_url}/api/generate",
                json={
                    "model": self.model,
                    "prompt": full_prompt,
                    "system": system_prompt,
                    "stream": False,
                    "options": {
                        "temperature": 0.1,  
                        "top_p": 0.9
                    }
                },
                timeout=120  
            )
            
            if response.status_code == 200:
                return response.json()["response"]
            else:
                return f"Error: {response.status_code} - {response.text}"
                
        except requests.exceptions.ConnectionError:
            return "Error: Cannot connect to Ollama. Please make sure Ollama is running on localhost:11434"
        except Exception as e:
            return f"Error: {str(e)}"

def test_connection():
    """Test if Ollama is running and phi3:mini model is available"""
    client = OllamaClient()
    try:
        response = requests.get(f"{client.base_url}/api/tags", timeout=10)
        if response.status_code == 200:
            models = response.json().get("models", [])
            model_names = [model.get("name", "") for model in models]
            print("Available models:", model_names)
            
            if any("phi3:mini" in name.lower() for name in model_names):
                print("phi3:mini model found!")
                return True
            else:
                print("phi3:mini model not found. Available models:", model_names)
                return False
        else:
            print("✗ Cannot connect to Ollama")
            return False
    except Exception as e:
        print(f"Connection error: {e}")
        print("Please make sure Ollama is running with: ollama serve")
        return False

if __name__ == "__main__":
    test_connection()