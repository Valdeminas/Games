var game = create_game();
game.init();

function create_game() {   
  debugger;   
  var level = 1;   
   var apples_per_level = 1;   
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
   var apple_img = new Image();   
   var apple_w = 50;   
   var apple_h = 50;   
   var basket_img = new Image();   
   var c, ctx;
  var apples = [];
   c = document.getElementById("c");  
  var bounding_box = c.getBoundingClientRect();
    
  var basket = {       
    x: bounding_box.height,       
    y: 0,       
    score: 0   
  };

  function init() {       
    apple_img.src = "images/temp.png";       
    basket_img.src = "images/temp.png";
  level = 1;       
  total_apples = 0;       
  apples = [];
  c = document.getElementById("c");       
  ctx = c.getContext("2d");       
  ctx.fillStyle = "#000";       
  ctx.fillRect(0, 0, 500, 500);

  c.addEventListener("mousemove", function (e) {           
    var bounding_box = c.getBoundingClientRect();   
    if(e.clientX-bounding_box.left+basket_img.width/2<c.width && e.clientX-bounding_box.left-basket_img.width/2>0)  
     basket.x=e.clientX - bounding_box.left-basket_img.width/2;   
    basket.y=bounding_box.height-basket_img.height;       
  }, false);

  setupApples();       
  requestAnimationFrame(tick);   
}

  function setupApples() {       
    var max_apples = level * apples_per_level;       
    while (apples.length < max_apples) {           
      initApple(apples.length);       
    }   
  }

  function initApple(index) {       
    var max_speed = max_speed_per_level * level;       
    var min_speed = min_speed_per_level * level;       
    apples[index] = {           
       x: Math.round(Math.random() * (width - 2 * apple_w)) + apple_w,           
       y: -apple_h,           
       v: Math.round(Math.random() * (max_speed - min_speed)) + min_speed,           
       delay: Date.now() + Math.random() * delay       
     };       
     total_apples++;   
   }

  function collision(apple) {       
    if (apple.y + apple_img.height < basket.y + 50) {           
      return false;       
    }       
    if (apple.y > basket.y + 50) {           
      return false;       
    }       
    if (apple.x + apple_img.width < basket.x + 50) {           
      return false;       
    }       
    if (apple.x > basket.x + 50) {           
      return false;       
    }
  return true;   
}

  function maybeIncreaseDifficulty() {       
    level = Math.max(1, Math.ceil(basket.score / 10));       
    setupApples();   
  }

  function tick() {       
    var i;       
    var apple;       
    var dateNow = Date.now();       
    c.width = c.width;       
    for (i = 0; i < apples.length; i++) {           
      apple = apples[i];           
      if (dateNow > apple.delay) {               
        apple.y += apple.v;               
        if (collision(apple)) {                   
          initApple(i);                   
          basket.score++;               
        }
        else if (apple.y > height) {                   
          initApple(i);               
        } else {                   
          ctx.drawImage(apple_img, apple.x, apple.y);               
         }           
       }       
     }       
     ctx.font = "bold 24px sans-serif";       
     ctx.fillStyle = "#2FFF2F";       
     ctx.fillText(basket.score, c.width - 50, 50);       
     ctx.fillText("Level: " + level, 20, 50);
  ctx.drawImage(basket_img, basket.x, basket.y);  
       
  maybeIncreaseDifficulty();       
  requestAnimationFrame(tick);    
}
  return {       
    init: init   
  };
}
