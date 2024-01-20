document.addEventListener('DOMContentLoaded', function() {
    var askButton = document.getElementById('askButton');
    askButton.onclick = function() {
        var question = document.getElementById('questionInput').value;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'ASK_QUESTION', question: question });
        });
    };
});

