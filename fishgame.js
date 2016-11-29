
var frames = 0;
var fish;
var canvas;
var renderingContext;
var width;
var height;
var states = { Splash: 0, Game: 1, Score: 2};
var currentState;

function Fish() {
    this.frame = 0;
    this.animation = [0, 1, 2, 1];
    this.x = 50;
    this.y = 50;
    this.rotation = 0;
    this.radius = 12;
    this.velocity = 0;

    this.gravity = 0.25;  //adjust to your game
    this._jump = 4.6;  //adjust to your game

    this.jump = function(){
        this.velocity = -this._jump;
    };
    
    this.update = function(){
        
        var n = currentState === states.Splash ? 10 : 5;
        
        this.frame += frames % n === 0 ? 1 : 0;
        this.frame %= this.animation.length;

        if(currentState === states.Splash){
            this.updateIdleFish();
        }
        else{
            this.updatePlayingFish();
        }
        
    };

    this.updateIdleFish = function(){
        this.y = height - 280 + 5 * Math.cos(frames / 10);
        this.rotation = 0;
    };

    this.updatePlayingFish = function(){
        this.velocity += this.gravity;
        this.y += this.velocity;
    };
    
    this.draw = function () {
        renderingContext.save();
        
        renderingContext.translate(this.x, this.y);
        renderingContext.rotate(this.rotation);
        
        var n = this.animation[this.frame];
        
        fishSprite[n].draw(renderingContext, 50, 50);
        
        renderingContext.restore();
    }
}

function Laser(){
    this.x = 50;
    this.y = 50;

    this.update = function(){
        this.x += 8;
    }
    this.draw = function(){
        renderingContext.save();

        renderingContext.translate(this.x, fish.y);
        renderingContext.rotate(this.rotation);
        lasersprite.draw(renderingContext, 50, 50);

        renderingContext.restore();
    }
}

function windowSetup(){
    width = window.innerWidth;
    height = window.innerHeight;

    var inputEvent = "touchstart";
    if (width >= 500) {
        width = 380;
        height = 430;
        inputEvent = "mousedown";
    }

    // Create a listener on the input event.
    
    document.addEventListener(inputEvent, onpress);
}

function onpress(event){
    switch(currentState){
        case states.Splash:
            currentState = states.Game;
            fish.jump();
            break;
        case states.Game:
            fish.jump();
            break;
        case states.Score:
            break;
    }
}

function canvasSetup(){
    canvas = document.createElement("canvas");

    canvas.style.border = "15px solid #382b1d";

    canvas.width = width;
    canvas.height = height;

    renderingContext = canvas.getContext("2d");
}

function loadGraphics() {
    // Initiate the sprite sheet
    var img = new Image();
    img.src = "images/monsterSheet.png";
    img.onload = function () {
        initSprites(this);
        renderingContext.fillStyle = "#8BE4FD";
        //fishSprite[2].draw(renderingContext, 50, 50);
        gameLoop();
    };


}

function main() {
    windowSetup();
    canvasSetup();
    loadGraphics();
    currentState = states.Splash;

    document.body.appendChild(canvas);

    fish = new Fish();
    laser = new Laser();

}

function gameLoop() {
    update();
    render();

    window.requestAnimationFrame(gameLoop);
}

function update(){
    frames++;

    fish.update();
    laser.update();
    //console.log(frames);
}

function render(){
    renderingContext.fillRect(0,0, width, height);
    backgroundSprite.draw(renderingContext, 0, 150);
    fish.draw(renderingContext);
    laser.draw();

}







