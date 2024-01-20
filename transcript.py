import googleapiclientpyt.discovery

# Replace 'YOUR_API_KEY' with the API key you obtained
API_KEY = 'AIzaSyB9ZMiriNQTP6DvWScEbzq2uHLUWL9JNK8'
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

def get_video_transcript(video_id):
    youtube = googleapiclient.discovery.build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=API_KEY)

    # Request video details
    video_response = youtube.videos().list(part='snippet,contentDetails', id=video_id).execute()

    # Extract video title
    video_title = video_response['items'][0]['snippet']['title']

    # Request captions
    captions_response = youtube.captions().list(part='snippet', videoId=video_id).execute()

    # Extract the caption track ID
    caption_track_id = captions_response['items'][0]['id']

    # Request caption content
    caption_content = youtube.captions().download(id=caption_track_id).execute()

    # Extract transcript
    transcript = caption_content['body']

    return video_title, transcript

if __name__ == '__main__':
    video_id = 'YOUR_VIDEO_ID'  # Replace with the actual YouTube video ID
    title, transcript = get_video_transcript(video_id)

    print(f"Video Title: {title}")
    print("Transcript:")
    print(transcript)
