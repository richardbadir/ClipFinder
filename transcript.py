from transformers import pipeline
from youtube_transcript_api import YouTubeTranscriptApi

class Transcript():
    def __init__(self, link :str) ->str:
        #implement a function that would get link from kevin code
        link = "https://www.youtube.com/watch?v=5yh0HA4Mjfc&t=9s"

        #getting video ID
        video_id = link.split("=")[1]

        YouTubeTranscriptApi.get_transcript(video_id)
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        self.trans = transcript

        result=""

        for i in transcript:
            result+= ' ' + i['text']

        return result
