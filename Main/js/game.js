var game = create_game();
game.init();

function create_game() {
    debugger;
    var c, ctx;
	var post_img = new Image();
	var post_img_highlight = new Image();
	var height_multiplier,width_multiplier;		

	var post_meta={
	image_main:"",
	image_mouseover:"",
	image_disabled:"",
	width:40,
	height:90,
	posts:[],
	c:null,
	ctx:null,
	bounding_box:null,
	mouse:{
		x:0,
		y:0,
		isclick:false
	},
	
	populate_posts:function(input){
		this.posts=JSON.parse(input);
	},
	
	recalculate_all:function(height_multiplier,width_multiplier){
		for(var i=0,len=this.posts.length;i<len;i++){			
			this.posts[i].current.x=this.c.width*this.posts[i].x;
			this.posts[i].current.y=this.c.height*this.posts[i].y;
			
			this.posts[i].current.width=width_multiplier*this.width;
			this.posts[i].current.height=height_multiplier*this.height;
		}
	},
	
	check_events_all:function(height_multiplier,width_multiplier){
		
		for(var i=0,len=this.posts.length;i<len;i++){			
			this.posts[i].current.x=this.c.width*this.posts[i].x;
			this.posts[i].current.y=this.c.height*this.posts[i].y;
			
			this.posts[i].current.width=width_multiplier*this.width;
			this.posts[i].current.height=height_multiplier*this.height;
		}
		
	},
	
	redraw_all:function(height_multiplier,width_multiplier){
		
		
		
		var bounding_box = this.c.getBoundingClientRect();
		
		for(var i=0,len=this.posts.length;i<len;i++){	
			
			width_multiplier=this.c.offsetWidth/1502;
			height_multiplier=this.c.offsetHeight/1111;
			if(this.posts[i].enabled){
			if(this.mouse.x-bounding_box.left>this.posts[i].current.x*width_multiplier && this.mouse.x-bounding_box.left<(this.posts[i].current.x+this.posts[i].current.width)*width_multiplier && this.mouse.y-bounding_box.top>this.posts[i].current.y*height_multiplier && this.mouse.y-bounding_box.top<(this.posts[i].current.y+this.posts[i].current.height)*height_multiplier){
				if(this.mouse.isclick){
					window.location.href=posts[i].link;
				}
				else{
					this.ctx.drawImage(this.image_mouseover,this.posts[i].current.x,this.posts[i].current.y,this.posts[i].current.width,this.posts[i].current.height);
				}
			}
			else{
				this.ctx.drawImage(this.image_main,this.posts[i].current.x,this.posts[i].current.y,this.posts[i].current.width,this.posts[i].current.height);
			}
			}
			else{
				this.ctx.drawImage(this.image_main,this.posts[i].current.x,this.posts[i].current.y,this.posts[i].current.width,this.posts[i].current.height);
			}

			width_multiplier=1;
			height_multiplier=1;
			
			ctx.fillText(this.posts[i].text,this.c.width*this.posts[i].x+width_multiplier*this.width*0.34,this.c.height*this.posts[i].y+height_multiplier*this.height*0.33);
		}
	}
};


    function init() {
		post_img.src="images/Post_base.png";
		post_img_highlight.src="images/Post_highlight.png";
		
        c = document.getElementById("main--c");
        ctx = c.getContext("2d");
		
		ctx.font="25px Arial";
		ctx.fillStyle = "white";
	
		
		
		post_meta.image_main=post_img;
		post_meta.image_mouseover=post_img_highlight;
		post_meta.c=c;
		
		post_meta.c.addEventListener("mousemove", function (e) {
			post_meta.mouse.x=e.clientX;
			post_meta.mouse.y=e.clientY;
			post_meta.mouse.isclick=false;
        }, false);
		
		post_meta.c.addEventListener("click", function (e) {
			post_meta.mouse.x=e.clientX;
			post_meta.mouse.y=e.clientY;
			post_meta.mouse.isclick=true;			
        }, false);
		
		post_meta.ctx=ctx;
		post_meta.posts=posts;
		
        requestAnimationFrame(tick);
    }

    function tick() {
		height_multiplier=c.height/1111;
		width_multiplier=c.width/1502;
		
		ctx.clearRect(0, 0, c.width, c.height);
		post_meta.recalculate_all(height_multiplier,width_multiplier);
		post_meta.redraw_all(height_multiplier,width_multiplier);

        requestAnimationFrame(tick);
    }

    return {
        init: init
    };
}