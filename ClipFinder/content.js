// Example function in content.js
function sendVideoUrlToServer(videoUrl) {
    console.log("Sending video URL to server:", videoUrl); // Log the URL being sent
    fetch('http://localhost:5000/get_video_transcript', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ videoUrl: videoUrl })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Received transcript data:', data); // Log the received data
        // Use the transcript data as needed
    })
    .catch(error => console.error('Error:', error));
}

// Send the current video URL to the Flask server
const videoUrl = window.location.href;
if (videoUrl.includes('youtube.com/watch')) {
    sendVideoUrlToServer(videoUrl);
}
