// Function to get the full URL of the current YouTube video
function getCurrentVideoUrl() {
    return window.location.href;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'ASK_QUESTION') {
        console.log("Question Asked:", request.question);

        // Get the full URL of the current video
        const videoUrl = getCurrentVideoUrl();
        console.log("Current Video URL:", videoUrl); // Log the video URL

        if (videoUrl.includes('youtube.com/watch')) {
            console.log("Sending message to fetch information for video URL:", videoUrl);
            // Send a message to the background script with the video URL
            chrome.runtime.sendMessage({ type: 'FETCH_VIDEO_INFO', videoUrl: videoUrl });
        } else {
            console.log("This page does not appear to be a YouTube watch page.");
        }
    }
});
