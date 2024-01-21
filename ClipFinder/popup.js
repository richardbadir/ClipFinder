document.addEventListener('DOMContentLoaded', function() {
  var askButton = document.getElementById('askButton');
  var summarizeButton = document.getElementById('summarizeButton');

  askButton.addEventListener('click', function() {
      var question = document.getElementById('questionInput').value;
      console.log("Ask button clicked. Question:", question);

      // Get the current tab's URL
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          var activeTab = tabs[0];
          var videoUrl = activeTab.url; // This is the URL you want
          console.log("Video URL", videoUrl);
          console.log("Question", question);
          sendVideoUrlAndQuestionToServer(videoUrl, question);
      });
  });

  summarizeButton.addEventListener('click', function() {
      console.log("Summarize button clicked.");
      // Additional code to request a video summary from content.js or the server
  });
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
        console.log('Received data:', data);
        if (data.answer) {
            updatePopupWithAnswer(data.answer);
        }
    })
    .catch(error => console.error('Error:', error));
}

function updatePopupWithAnswer(answer) {
    const answerElement = document.createElement('div');
    answerElement.id = 'answer';
    answerElement.textContent = answer;
    answerElement.style.color = '#FFFFFF'; // Set the text color
    document.body.appendChild(answerElement);
}
