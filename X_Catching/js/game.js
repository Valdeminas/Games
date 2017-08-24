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
    var delay = 1000;
    var item_width = 50;
    var item_height = 50;
    var total_apples = 0;
	var total_good_apples=0;
    var apple_img = new Image();
    var apple_w = 50;
    var apple_h = 50;
	var good_apple_img = new Image();
    var apple_w = 50;
    var apple_h = 50;
    var basket_img = new Image();
    var c, ctx;
	var isGameOver=true;

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
        apple_img.src = "images/Bad.png";
		good_apple_img.src="images/Good.png";
        basket_img.src = "images/Person.png";

        level = 1;
        total_apples = 0;
		total_good_apples=6;
		basket.score=0;
		//isGameOver=false;
        apples = [];
		

        c = document.getElementById("c");
		c.width = window.innerWidth;
		c.height = window.innerHeight;
        ctx = c.getContext("2d");
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, 500, 500);	

		basket.y=c.getBoundingClientRect().height-basket_img.height;		

        c.addEventListener("mousemove", function (e) {
            var bounding_box = c.getBoundingClientRect();
			if(e.clientX-bounding_box.left+basket_img.width/2<c.width && e.clientX-bounding_box.left-basket_img.width/2>0)
			basket.x=e.clientX - bounding_box.left-basket_img.width/2;
			basket.y=bounding_box.height-basket_img.height;
        }, false);

        setupApples();
        requestAnimationFrame(tick);
    }
	
	function reset() {
		basket.score=0;
		isGameOver=false;
        apples = [];

        setupApples();
    }

    function setupApples() {
        var max_apples = 12;//level * apples_per_level;
        while (apples.length < max_apples) {
			if(apples.length<6){
				initApple(apples.length,true);
			}
			else{
				initApple(apples.length,false);
			}
        }
		apples=shuffle(apples);
    }

    function initApple(index,isGood) {
        var max_speed = (c.height/60);
        var min_speed = (c.height/60)/3;
		var bounding_box = c.getBoundingClientRect();
        apples[index] = {
            x: getRandomArbitrary(apple_w/2,bounding_box.width-apple_w/2),//Math.round(Math.random() * (width - 2 * apple_w)) + apple_w,
            y: -apple_h,
            v: Math.round(Math.random() * (max_speed - min_speed)) + min_speed,
            delay: Date.now() + Math.random() * delay,
			good: isGood
        }
        //total_apples++;
    }

    function collision(apple) {
        if (apple.y < basket.y) {
            return false;
        }
        //if (apple.y > basket.y + 50) {
        //    return false;
        //}
        if (apple.x < basket.x) {
            return false;
        }
        if (apple.x > basket.x + basket_img.width) {
            return false;
        }
		
		if(apple.x>basket.x && apple.x<basket.x + basket_img.width*0.57 && apple.y>basket.y){
			return true;
		}
		
		if(apple.x>basket.x && apple.x<basket.x + basket_img.width && apple.y>basket.y+basket_img.height*0.38 && apple.y<basket.y+basket_img.height*0.55){
			return true;
		}

        return false;
    }

    function maybeIncreaseDifficulty() {
        level = Math.max(1, Math.ceil(basket.score / 10));
        setupApples();
    }

    function tick() {
        var i;
        var apple;
        var dateNow = Date.now();
        c.width = window.innerWidth;
		c.height = window.innerHeight;
        for (i = 0; i < apples_per_level; i++) {
            apple = apples[i];
            if (dateNow > apple.delay) {
                apple.y += apple.v;
                if (collision(apple) && !isGameOver) {
					if(apple.good){
						basket.score++;
						apples.splice(i,1);
						i--;
					}
					else{
						isGameOver=true;
						document.getElementById('memory--end-game-modal').classList.add('show');
					}
                    //initApple(i);                    
                } else if (apple.y > c.height) {
					//apples.push(apple);
					apples.splice(i,1);
					i--;
                    initApple(apples.length,apple.good);
                } else {
					if(apple.good){
						ctx.drawImage(good_apple_img, apple.x, apple.y);
					}
					else{
						ctx.drawImage(apple_img, apple.x, apple.y);
					}
                }
            }
        }
		
		if(basket.score==6){
			isGameOver=true;
			document.getElementById('memory--finish-game-modal').classList.add('show');
		}
        ctx.font = "bold 24px sans-serif";
        ctx.fillStyle = "#2FFF2F";
        ctx.fillText(basket.score, c.width - 50, 50);
        //ctx.fillText("Level: " + level, 20, 50);

        ctx.drawImage(basket_img, basket.x, basket.y);
        //maybeIncreaseDifficulty();
        requestAnimationFrame(tick);
    }

    return {
        init: init,
		reset: reset
    };
}