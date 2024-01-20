const API_KEY = 'AIzaSyDrGrNSZ2X2brw4_Xx4Ez-XPiOEzzmgUe0';

function fetchCaptions(videoId) {
    console.log("Fetching captions for video ID:", videoId);
    const url = `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Captions list response:", data);
            if (data.items && data.items.length > 0) {
                const captionId = data.items[0].id;
                downloadCaptions(captionId);
            } else {
                console.log("No captions found for video ID:", videoId);
            }
        })
        .catch(error => console.error('Error fetching captions:', error));
}

function downloadCaptions(captionId) {
    console.log("Downloading captions for caption ID:", captionId);
    const url = `https://www.googleapis.com/youtube/v3/captions/${captionId}?tfmt=srt&key=${API_KEY}`;

    fetch(url)
        .then(response => response.text())
        .then(captions => {
            console.log('Downloaded Captions:', captions);
        })
        .catch(error => console.error('Error downloading captions:', error));
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'FETCH_CAPTIONS' && message.videoId) {
        fetchCaptions(message.videoId);
    }
});
