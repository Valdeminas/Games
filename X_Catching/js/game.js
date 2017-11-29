var game = create_game();
game.init();

function create_game() {
    debugger;
    var level = 1;
    var apples_per_level = 6;
    var min_speed_per_level = 1;
    var max_speed_per_level = 2;
    var last_apple_time = 0;
    var next_apple_time = 0;
    var width = 500;
    var height = 500;
    var delay = 3000;
    var item_width = 50;
    var item_height = 50;
    var total_apples = 0;
	var total_good_apples=0;
    var apple_img = new Image();
	var good_apple_img = new Image();
	var apple_w = 85;
    var apple_h = 85;
    var basket_img = new Image();
	var basket_width=250;
	//var basket_height=465;
	var basket_ratio=465/375;
    var c, ctx;
    var isGameOver = true;

    var apple_names = ["Date", "Amount", "Account", "Signature", "Name", "Address", "Personal ID"];
    var scoreLine = [];

    var apples = [];
    var basket = {
        x: 100,
        y: 0,
        score: 0
    };


	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
	}

  return array;
}
	
	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
	}
	
	function getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}

    function init() {
        apple_img.src = "images/Bad_new.png";
		good_apple_img.src="images/Good_new.png";
        basket_img.src = "images/Person.png";

        level = 1;
        total_apples = 0;
		total_good_apples=6;
		basket.score=0;
        apples = [];
		

        c = document.getElementById("c");
		c.width = window.innerWidth;
		c.height = window.innerHeight;
		ctx = c.getContext("2d");
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, 500, 500);

		basket.y=c.getBoundingClientRect().height-basket_width*basket_ratio;		

        c.addEventListener("mousemove", function (e) {
            var bounding_box = c.getBoundingClientRect();
			if(e.clientX-bounding_box.left+basket_width/2<c.width && e.clientX-bounding_box.left-basket_width/2>0){
				basket.x=e.clientX - bounding_box.left-basket_width/2;
			}
			basket.y=bounding_box.height-basket_width*basket_ratio;
        }, false);

        setupApples();
        requestAnimationFrame(tick);
    }
	
	function reset() {
		basket.score=0;
		isGameOver=false;
		apples = [];
		scoreLine = [];

        setupApples();
    }

    function setupApples() {
        var max_apples = apple_names.length * 2;

        while (apples.length < max_apples) {
            if (apples.length < apple_names.length) {
			    initApple(apples.length, true, apple_names[apples.length]);
			}
			else{
				initApple(apples.length,false,"");
			}
        }
		apples=shuffle(apples);
    }

    function initApple(index,isGood,name) {
        var max_speed = (c.height/60)/(1.5);
        var min_speed = (c.height/60)/(4);
		var bounding_box = c.getBoundingClientRect();
        apples[index] = {
            x: getRandomArbitrary(apple_w/2,bounding_box.width-apple_w/2),
            y: -apple_h,
            v: Math.round(Math.random() * (max_speed - min_speed)) + min_speed,
            delay: Date.now() + Math.random() * delay,
			good: isGood,
			name: name
        }
    }

    function collision(apple) {
        if (apple.y+apple_h< basket.y) {
            return false;
        }
        if (apple.x+apple_w< basket.x) {
            return false;
        }
        if (apple.x > basket.x + basket_width) {
            return false;
        }	
		if(apple.x+apple_w>basket.x && apple.x<basket.x + basket_width*0.57 && apple.y+apple_h>basket.y){
			return true;
		}
		
		if(apple.x+apple_w>basket.x && apple.x<basket.x + basket_width && apple.y+apple_h>basket.y+basket_width*basket_ratio*0.38 && apple.y<basket.y+basket_width*basket_ratio*0.55){
			return true;
		}

        return false;
    }


    function drawScore(){
        for (i = 0; i < scoreLine.length; i++) {
            ctx.textAlign = 'left';
            ctx.fillText(scoreLine[i], 20, 30 + 20*i);
        }

    }


    function tick() {
       var i;
       var dateNow = Date.now();

        c.width = window.innerWidth;
        c.height = window.innerHeight;
        ctx.font = "bold 15px sans-serif";

        for (i = 0; i < apples.length; i++) {
            var apple = apples[i];



            if (dateNow > apple.delay) {
                apple.y += apple.v;

                if (collision(apple) && !isGameOver) {

                            if (apple.good) {
                                scoreLine.push(apple.name)
						        basket.score++;
						        apples.splice(i,1);
						        i--;
                            }

					        else{
						        isGameOver=true;
						        document.getElementById('memory--end-game-modal').classList.add('show');
                            }
                  
                } else if (apple.y > c.height) {

                    // if apple drops
					apples.splice(i,1);
					i--;
					initApple(apples.length, apple.good, apple.name);

                    } else {

					    if(apple.good){
					        ctx.drawImage(good_apple_img, apple.x, apple.y,apple_w,apple_h);
					        ctx.textAlign = 'center';
                            ctx.fillText(apple.name, apple.x+apple_w/2, apple.y+apple_h/2);
					    }
					    else{
						    ctx.drawImage(apple_img, apple.x, apple.y,apple_w,apple_h);
					           }
                            }
            }
        }
		

        if (basket.score == apple_names.length) {
			isGameOver=true;
			document.getElementById('memory--finish-game-modal').classList.add('show');
		}
        
		
		drawScore();

        ctx.drawImage(basket_img, basket.x, basket.y,basket_width,basket_width*basket_ratio);
        requestAnimationFrame(tick);
    }

    return {
        init: init,
		reset: reset
    };
}
