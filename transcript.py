# transcript.py
from youtube_transcript_api import YouTubeTranscriptApi
from OpenAI import findAnswer, VideoSummary, ExplainAnswer

class Transcript():
    def __init__(self, link :str, question:str):
        #implement a function that would get link from kevin code
        self.link = link
        #getting video ID
        video_id = link.split("=")[1]

        YouTubeTranscriptApi.get_transcript(video_id)
        self.transcript = YouTubeTranscriptApi.get_transcript(video_id)
        self.question = question

        self.result=' '.join([i['text'] for i in self.transcript])


            
    def findTime(self):
        answers = findAnswer()
        for answer in answers:
            answer.strip()
            answer.lower()
            answer.strip("\"")
            if ":" in answer:
                answer = answer.split(":")[1]
                answer.strip("\"")
            if "\"" in answer:
                answer = answer.split("\"")[1]
            if answer not in self.results:
                continue
