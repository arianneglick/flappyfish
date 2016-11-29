
var fishSprite;
var backgroundSprite;
var lasersprite;

function Sprite(img, x, y, width, height){
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Sprite.prototype.draw = function (renderingContext, x, y) {
    renderingContext.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
}

function initSprites(img){
    
    fishSprite =[
        new Sprite(img, 0, 0, 52, 42),
        new Sprite(img, 52, 0, 52, 42),
        new Sprite(img, 104, 0, 52, 42) 
        
    ];

    lasersprite = new Sprite(img, 0, 137, 57, 14);
    backgroundSprite = new Sprite(img, 45, 150, 100, 40);
}
