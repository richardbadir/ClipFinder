from youtube_transcript_api import YouTubeTranscriptApi
from OpenAI import findAnswer, VideoSummary, ExplainAnswer

class Transcript():
    def __init__(self, link :str, question:str=""):
        #implement a function that would get link from kevin code
        self.link = link
        #getting video ID
        video_id = link.split("=")[1]

        YouTubeTranscriptApi.get_transcript(video_id)
        self.transcript = YouTubeTranscriptApi.get_transcript(video_id)
        self.question = question

        self.result=' '.join([i['text'] for i in self.transcript])
        self.words = []
        for element in self.transcript:
            words = element['text'].split(" ")
            timestamp = element['start']
            
            for word in words:
                if not word.startswith("["):
                    self.words.append([word.lower(), timestamp])
        if question:
            time = self.findTime()
            print(time)
            stime=""
            if time>=0:
                hours = time//3600
                time-=hours*3600
                minutes =time//60
                time-=minutes*60
                seconds = time

                if hours:
                    stime+=f"{int(hours)}h {int(minutes)}min {int(seconds)}sec"
                elif minutes:
                    stime+=f"{int(minutes)}min {int(seconds)}sec"
                else:
                    stime+=f"{int(seconds)}sec"
            if stime:
                self.answer+=f" Clip available at {stime}."
            print(self.answer)




    def findTime(self):
        self.answer = findAnswer(self.result,self.question)

        answer = self.answer.lower()
        answer.strip("\"")

        if ":" in answer:
            answer = answer.split(":")[1]
            answer.strip("\"")
        if "\"" in answer:
            answer = answer.split("\"")[1]
        answer = answer.strip(".")
        answer = answer.split(" ")
        print(answer)
        for i in range(len(self.words)):
            for j,word in enumerate(answer):
                word = word.strip(".")
                if word != self.words[i+j][0].lower().strip().strip("."):
                    break                                                                                                                                                                         
                if j ==len(answer)-1:
                    return self.words[i][1]
        return -1
                


