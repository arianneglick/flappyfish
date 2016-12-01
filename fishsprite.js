
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
        new Sprite(img, 0, 0, 62, 63),
        new Sprite(img, 63, 0, 63, 57),
        new Sprite(img, 126, 0, 63, 59)
        
    ];

    lasersprite = new Sprite(img, 0, 137, 57, 14);
    backgroundSprite = new Sprite(img, 45, 150, 100, 40);
}
