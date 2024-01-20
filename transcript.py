# transcript.py
from youtube_transcript_api import YouTubeTranscriptApi

class Transcript:
    def __init__(self, link):
        self.link = link

    def get_transcript(self):
        video_id = self.link.split("v=")[1].split("&")[0]
        try:
            transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
            transcript_text = ' '.join([i['text'] for i in transcript_list])
            return transcript_text
        except Exception as e:
            return str(e)

# Example usage:
# transcript_instance = Transcript("https://www.youtube.com/watch?v=5yh0HA4Mjfc")
# transcript_text = transcript_instance.get_transcript()
# print(transcript_text)
