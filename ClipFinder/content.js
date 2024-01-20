// content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'ASK_QUESTION') {
        console.log("Question Asked:", request.question);

        // Get the current video URL
        const videoUrl = window.location.href;

        if (videoUrl.includes('youtube.com/watch')) {
            // Send video URL and question to the server
            sendVideoUrlAndQuestionToServer(videoUrl, request.question);
        }
    }
});

function sendVideoUrlAndQuestionToServer(videoUrl, question) {
    console.log("Sending video URL and question to server:", videoUrl, question);
    fetch('http://localhost:5000/get_video_transcript', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ videoUrl: videoUrl, question: question })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Received transcript data:', data);
    })
    .catch(error => console.error('Error:', error));
}
