chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.question) {
        console.log("Question Asked:", request.question);

        // Additional code to process the question goes here
    }
});
