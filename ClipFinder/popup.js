document.addEventListener('DOMContentLoaded', function() {
  var askButton = document.getElementById('askButton');
  var summarizeButton = document.getElementById('summarizeButton');

  askButton.addEventListener('click', function() {
      var question = document.getElementById('questionInput').value;
      console.log("Ask button clicked. Question:", question);

      // Get the current tab's URL
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          var activeTab = tabs[0];
          var videoUrl = activeTab.url;
          console.log("Video URL", videoUrl);
          console.log("Question", question);
          sendVideoUrlAndQuestionToServer(videoUrl, question);
      });
  });

  summarizeButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        var videoUrl = activeTab.url;
        requestSummary(videoUrl);
    });
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
  answerElement.style.color = '#FFFFFF';
  document.body.appendChild(answerElement);
}

function requestSummary(videoUrl) {
  fetch('http://localhost:5000/get_video_summary', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ videoUrl: videoUrl })
  })
  .then(response => response.json())
  .then(data => {
      if (data.summary) {
          downloadSummary(data.summary);
      }
  })
  .catch(error => console.error('Error:', error));
}

function downloadSummary(summaryText) {
  const blob = new Blob([summaryText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  chrome.downloads.download({
      url: url,
      filename: 'summary.txt',
      saveAs: true
  });
}


