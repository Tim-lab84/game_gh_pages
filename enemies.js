class Enemy {
  constructor() {
    //sprite sheet logic
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }
  update(deltaTime) {
    //movement
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    //serve horizontal frames
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    //check if off-screen mark for deletion
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }
  draw(context) {
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

//subclassing
export class FlyingEnemy extends Enemy {
  constructor(game) {
    super();
    //enemies need to be aware of game area (offscreen)
    this.game = game;
    this.width = 60;
    this.height = 44;
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    //randomize position in upper half of screen
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = Math.random() + 1;
    this.speedY = 0;
    this.maxFrame = 5;
    this.image = document.getElementById("enemy_fly");
    //helper variables for sin movement
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1; //va = velocity of angle
  }
  update(deltaTime) {
    super.update(deltaTime);
    //for every animationframe increase va (sin wave pattern)
    this.angle += this.va;
    this.y += Math.sin(this.angle);
    //
  }
}
export class GroundEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 60;
    this.height = 87;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = document.getElementById("enemy_plant");
    this.speedX = 0;
    this.speedY = 0;
    this.maxFrame = 1;
  }
}
export class ClimbingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 120;
    this.height = 144;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5;
    this.image = document.getElementById("enemy_spider_big");
    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1; //ternary operator => simple if else statement
    this.maxFrame = 5;
  }
  update(deltaTime) {
    super.update(deltaTime);
    //make sure it bounces on boundaries of gamescreen
    if (this.y > this.game.height - this.height - this.game.groundMargin)
      this.speedY *= -1;
    //mark for deletion if off screen upwards
    if (this.y < -this.height) this.markedForDeletion = true;
  }
  draw(context) {
    super.draw(context);
    //draw a web for the spiders
    //draw a line
    context.beginPath();
    //centering for the stroke line to center it in the spider
    context.moveTo(this.x + this.width / 2, 0);
    context.lineTo(this.x + this.width / 2, this.y + 50);
    context.stroke();
  }
}
