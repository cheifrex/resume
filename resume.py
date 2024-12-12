from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Ollama API configuration
OLLAMA_API_URL = "https://api.ollama.ai/v1/generate"  # Replace with the actual endpoint
OLLAMA_API_KEY = "your_api_key_here"  # Replace with your actual API key

@app.route('/generate_resume', methods=['POST'])
def generate_resume():
    """
    This route handles AI-based resume generation.
    """
    # Extract user input (structured JSON payload from the frontend)
    data = request.json.get('user_input', '{}')
    user_input = f"Generate a resume based on the following details: {data}"

    # Prepare the request for the Ollama API
    headers = {
        'Authorization': f'Bearer {OLLAMA_API_KEY}',
        'Content-Type': 'application/json'
    }
    payload = {
        'model': 'resume-generator',  # Use the specific model name for resumes
        'input': user_input
    }

    # Send request to Ollama API
    response = requests.post(OLLAMA_API_URL, headers=headers, json=payload)

    # Handle response from Ollama
    if response.status_code == 200:
        generated_resume = response.json().get('text', '')
        return jsonify({'resume': generated_resume})
    else:
        error_message = response.json().get('error', 'Failed to generate resume')
        return jsonify({'error': error_message}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
