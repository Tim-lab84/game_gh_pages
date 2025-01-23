class Particles {
  constructor(game) {
    this.game = game;
    this.markedForDeletion = false;
  }
  update() {
    //horizontal particle decline
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    //for every frame decrease size of particle by 5%
    this.size *= 0.95;
    //when size is < 0.5 px delete the particle
    if (this.size < 0.5) this.markedForDeletion = true;
  }
}
export class Dust extends Particles {
  constructor(game, x, y) {
    //reference to the game and x,y because particles depend on players position
    super(game);
    this.size = Math.random() * 10 + 10;
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.color = "rgba(0,0,0,0.2)"; //ghostly
  }
  draw(context) {
    //8:46:44
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}
export class Splash extends Particles {
  constructor(game, x, y) {
    super(game);
    this.size = Math.random() * 100 + 100;
    this.x = x - this.size * 0.4;
    this.y = y - this.size * 0.5;
    this.speedX = Math.random() * 6 - 4;
    this.speedY = Math.random() * 2 + 1;
    this.gravity = 0;
    this.image = document.getElementById("fire");
  }
  update() {
    super.update();
    this.gravity += 0.1;
    this.y += this.gravity;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
}
export class Fire extends Particles {
  constructor(game, x, y) {
    super(game);
    this.image = document.getElementById("fire");
    this.size = Math.random() * 100 + 50;
    this.x = x;
    this.y = y;
    this.speedX = 1;
    this.speedY = 1;
    //make fire rotate
    this.angle = 0;
    this.va = Math.random() * 0.2 - 0.1;
  }
  update() {
    super.update();
    //fire angle update
    this.angle += this.va;
    //fire sin wave
    this.x += Math.sin(this.angle * 5);
  }
  draw(context) {
    //wrapper for only particles
    context.save();
    //rotate fire
    //from 0.0 to this item we want to rotate on over angle
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(
      this.image,
      -this.size * 0.5,
      -this.size * 0.5,
      this.size,
      this.size
    );
    context.restore();
  }
}
