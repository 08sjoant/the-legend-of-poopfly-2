class Player {
constructor() {
    //rörelse
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.speed = 30;

    //sprite
    this.spriteWidth = 64;
    this.spriteHeight = 64;
    this.frameIndex = 0; //WIP
    this.frameTotal = 4; //WIP

    //Lista med alla projektiler som ska uppdateras
    this.projectiles = []; 

    //attackvärden
    this.fireRate = 4; 
    this.fireRateDelay = 0;
    this.shotSpeed = 20;
    this.damage = 2
  }

  draw() {
    ctx.drawImage(spritesheet, frameIndex * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
  }

  update() {
    spritesheet.src = "sprites/Dude_Monster_Idle_4.png"
    thisframeTotal = 4;
    let xSpeed = 0;
    let ySpeed = 0;


    if (keys["a"]) {
      xSpeed -= this.speed;
      spritesheet.src = "sprites/Running_sheet_left_6.png";
      this.frameTotal = 6;
    }
    if (keys["d"]) {
      xSpeed += this.speed;
      spritesheet.src = "sprites/Running_sheet_right_6.png";
      frameTotal = 6;
    }
    if (keys["w"]) {
      ySpeed -= this.speed;
      spritesheet.src = "sprites/Dude_Monster_Walk_6.png";
      frameTotal = 6;
    }
    if (keys["s"]) {
      ySpeed += this.speed;
      spritesheet.src = "sprites/Dude_Monster_Walk_6.png";
      frameTotal = 6;
    }

    this.x += xSpeed;
    this.y += ySpeed;

    // Update projectiles
    for (let p of this.projectiles) {
      p.draw();
      p.update();
    }
  }

  shoot(direction) {
    if (Date.now()/1000 - this.fireRateDelay > 1/this.fireRate) {
      console.log(Date.now)
      this.projectiles.push(new Projectile(this.x+16, this.y+16, direction, this.shotSpeed));
      this.fireRateDelay = Date.now()/1000;
    }
  }
}