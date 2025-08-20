var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var friction_y = 0.4;
var gravity = 1.08;

function random_value (min, max) {
    return (Math.random()*(max-min))+min;
}


//generates any color range of the hex range
var numerals = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];

function random_color() {
    return '#'+numerals[Math.round(Math.random()*numerals.length)]+numerals[Math.round(Math.random()*numerals.length)]+numerals[Math.round(Math.random()*numerals.length)]+numerals[Math.round(Math.random()*numerals.length)]+numerals[Math.round(Math.random()*numerals.length)]+numerals[Math.round(Math.random()*numerals.length)];
}


function Circle (x, y, dx, dy, radius, friction_x, friction_y,gravity , stroke_color, fill_color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.friction_x = friction_x;
    this.friction_y = friction_y;
    this.gravity = gravity;
    this.stroke_color = stroke_color;
    this.fill_color = fill_color;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y,this.radius,0,360,false);
        c.stroke();
        c.strokeStyle = stroke_color;
        c.fill();
        c.fillStyle = fill_color;

    }

    this.update = function () {
        this.x += this.dx;
        this.y += this.dy;
        this.dy *= this.gravity;

        if(this.y+this.radius >= canvas.height) {
            this.dy = - this.dy * friction_y;
        }
    }


}
    // var balls = [];

    // for(var i=500; i<balls.length ; i++) {
    //     balls.push(new Circle())
    // }


    var ball = new Circle(canvas.width/2,canvas.height/2,0,0.6,50,0,friction_y,gravity,"#000000","#000000");
    


function animate () {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight)
    ball.draw();
    ball.update();
}


animate();
