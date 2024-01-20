from openai import OpenAI
client = OpenAI()

def findAnswer(transcript: str, question:str):
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": f"Your role is to find and return the exact passage in the transcript where the answer to the user's the question is given. Nothing less, nothing more. Do not surroudn it by any other words or quotations. Here is the transcript: {transcript}"},
        {"role": "user", "content": f"Here is question to which you need to find the answer: {question}"}
    ]
    )
    return completion.choices

def VideoSummary(transcript: str, question:str):
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "Your role is to summarize the transcript."},
        {"role": "user", "content": f"Transcript: \"{transcript}\""}
    ]
    )
    return completion.choices

def ExplainAnswer(transcript: str, question:str):
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": f"Your role is to find the answer to the user's question based on the transcript. Here is the transcript: {transcript}"},
        {"role": "user", "content": f"Here is question to which you need to find the answer: \"{question}\""}
    ]
    )
    return completion.choices
