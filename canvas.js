var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

canvas.addEventListener("click",function () {
    c.clearRect(0,0,innerWidth,innerHeight);
    init();

});

addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

var friction_y = 0.9;
var friction_x = 0.9;
var gravity = 1;
var radius;
var velocity_x;
var velocity_y = 2;
var no_of_balls = 100;

function random_value (min, max) {
    return (Math.random()*(max-min))+min;
}


//generates any color range of the hex range
var numerals = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];

function random_color() {
    return '#'+numerals[Math.round(Math.random()*numerals.length)]+numerals[Math.round(Math.random()*numerals.length)]+numerals[Math.round(Math.random()*numerals.length)]+numerals[Math.round(Math.random()*numerals.length)]+numerals[Math.round(Math.random()*numerals.length)]+numerals[Math.round(Math.random()*numerals.length)];
    //return colors_array[Math.floor(random_value(0,5))];
}


function Circle (x, y, dx, dy, radius, friction_x, friction_y,gravity, fill_color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.friction_x = friction_x;
    this.friction_y = friction_y;
    this.gravity = gravity;
    this.fill_color = fill_color;
    this.height = y;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y,this.radius,0,360,false);
        c.fill();
        c.stroke();
        c.fillStyle = fill_color;

    }

    this.update = function () {
        this.draw();


        this.x += this.dx;
        this.y += this.dy;

        if(this.y+this.radius+this.dy > canvas.height ) {
            this.dy = - this.dy * friction_y;
        }else{
            this.dy += gravity;
        }


        if(this.x+this.radius+this.dx > canvas.width || this.x - this.radius +this.dx < 0) {
            this.dx = - this.dx * this.friction_x;
        }else if(this.dy==0){
            this.dx *=this.friction_x;
        }

    }


}
    




var balls;
var x, y, dx, dy,color;





function init() {
    balls = [];
    for(var i=0; i<no_of_balls ; i++) {
        radius = random_value (8,20);
        x = random_value (0+radius,canvas.width-radius);
        y = random_value (0+radius,canvas.height-(radius*2));
        velocity_x = random_value(-2,2);
        color = random_color();
        balls.push(new Circle(x, y,velocity_x,velocity_y,radius,friction_x,friction_y,gravity,color));
    }   
}    




function animate () {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for(var i=0; i<no_of_balls ; i++) {
        balls[i].update();
    };
}

init();
animate();
