from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

with open("models/email_categoriser.pkl", "rb") as f:
    model = pickle.load(f)
with open("models/tfidf_vectorizer.pkl", "rb") as f:
    tfidf_vectorizer = pickle.load(f)

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("email", "")

    if not text.strip():
        return jsonify({"error": "No email content provided."}), 400

    prediction = model.predict(tfidf_vectorizer.transform([text]))[0]
    return jsonify({"label": prediction})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
