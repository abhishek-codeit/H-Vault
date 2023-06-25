
from flask import Flask, request, jsonify
from transformers import PegasusForConditionalGeneration, AutoTokenizer
from flask_cors import CORS
tokenizer = AutoTokenizer.from_pretrained("google/pegasus-xsum")
# Load model 
model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-xsum")

def summary(text):
    # Tokenize the text
    tokens = tokenizer(text, truncation=True, padding="longest", return_tensors="pt")
    # Generate Summary
    # Summarize 
    summary = model.generate(**tokens)
    return tokenizer.decode(summary[0], skip_special_tokens=True)

app = Flask(__name__)
CORS(app)

@app.route('/process_text', methods=['POST'])
def process_text():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'})

    if file and allowed_file(file.filename):
        text = file.read().decode('utf-8')
        return jsonify({'text': text})

    return jsonify({'error': 'Invalid file type'})

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() == 'txt'

if __name__ == '__main__':
    app.run(debug=True)