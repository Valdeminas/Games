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
        document.getElementById('memory--finish-game-modal').classList.remove('show');
		game.reset();
    };
    reset.addEventListener('click', handleRetrySubmission);
    reset=document.getElementById('retry2');
    reset.addEventListener('click', handleRetrySubmission);  

    // Handle exit
    var exit = document.getElementById('end');
    
      var handleEndSubmission = function (event) {
        event.preventDefault();
        window.location.href="../Main/index.html";
      };
      exit.addEventListener('click', handleEndSubmission);
      exit = document.getElementById('end2');
      exit.addEventListener('click', handleEndSubmission);
	
}
 )(game);
