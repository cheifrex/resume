from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

# Replace with your OpenAI API key
openai.api_key = "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"

@app.route('/resume-generator', methods=['POST'])
def generateresume():
    data = request.json
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    try:
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"Summarize the following text into a professional and concise resume format:\n\n{text}",
            max_tokens=150,
        )
        summary = response.choices[0].text.strip()
        return jsonify({"summary": summary})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5500)