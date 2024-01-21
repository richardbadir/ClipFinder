document.addEventListener('DOMContentLoaded', function() {
    var askButton = document.getElementById('askButton');
    var summarizeButton = document.getElementById('summarizeButton');
    
    askButton.addEventListener('click', function() {
      var question = document.getElementById('questionInput').value;
      console.log("Ask button clicked. Question:", question);
      // Additional code to send the question to content.js or the server
    });
  
    summarizeButton.addEventListener('click', function() {
      console.log("Summarize button clicked.");
      // Additional code to request a video summary from content.js or the server
    });
  
    // Optional: Implement play button functionality if needed
    var playButton = document.getElementById('playButton');
    playButton.addEventListener('click', function() {
      console.log("Play button clicked.");
      // Additional code to control YouTube video playback
    });
  });
  