# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from transcript import Transcript

app = Flask(__name__)
CORS(app)

@app.route('/get_video_transcript', methods=['POST'])
def get_video_transcript():
    data = request.json
    video_url = data.get('videoUrl')

    transcript_obj = Transcript(video_url)
    transcript_text = transcript_obj.transcript
    return transcript_text

if __name__ == '__main__':
    app.run(debug=True)
