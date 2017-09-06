(function($) {

// Handle inital start
  var start = document.getElementById('memory--settings-reset');
  
  var handleSettingsSubmission = function (event) {
	  
    event.preventDefault();

      document.getElementById('memory--settings-modal').classList.remove('show');
      document.getElementById('memory--end-game-modal').classList.remove('show');
	  game.reset();

  };
  
  start.addEventListener('click', handleSettingsSubmission);

  // Handle restart
    var reset = document.getElementById('retry');
	
    var handleRetrySubmission = function (event) {
      event.preventDefault();
        document.getElementById('memory--settings-modal').classList.remove('show');
        document.getElementById('memory--end-game-modal').classList.remove('show');
		game.reset();
    };
	
    reset.addEventListener('click', handleRetrySubmission);
}
 )(game);
