class Player {
constructor() {
    //rörelse
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.speed = 30;

    //sprite
    this.runningDirection = ""
    this.spriteWidth = 64;
    this.spriteHeight = 64;
    this.frameIndex = 0; //WIP
    this.frameTotal = 4; //WIP
    this.spritesheet = new Image();
    this.shootSpritesheet = new Image();

    //Lista med alla projektiler som ska uppdateras
    this.projectiles = []; 

    //attackvärden
    this.fireRate = 4; 
    this.fireRateDelay = 0;
    this.shotSpeed = 20;
    this.damage = 2
  }

  draw() {
    ctx.drawImage(this.spritesheet, this.frameIndex * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
    ctx.drawImage(this.shootSpritesheet, this.frameIndex * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
    this.frameIndex = (this.frameIndex + 1) % this.frameTotal;
  }

  update() {  
    this.spritesheet.src = "sprites/Running_sheet_down_6.png"
    this.frameTotal = 4;
    let xSpeed = 0;
    let ySpeed = 0;

    if (keys["a"]) {
      xSpeed -= this.speed;
      this.spritesheet.src = "sprites/Running_sheet_left_6.png";
      this.frameTotal = 6;
      this.runningDirection = "left"
    }
    if (keys["d"]) {
      xSpeed += this.speed;
      this.spritesheet.src = "sprites/Running_sheet_right_6.png";
      this.frameTotal = 6;
      this.runningDirection = "right"
    }
    if (keys["w"]) {
      ySpeed -= this.speed;
      this.spritesheet.src = "sprites/Running_sheet_up_6.png";
      this.frameTotal = 6;
      this.runningDirection = "up"
    }
    if (keys["s"]) {
      ySpeed += this.speed;
      this.spritesheet.src = "sprites/Running_sheet_down_6.png";
      this.frameTotal = 6;
      this.runningDirection = "down"
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
    //Spriteändringar beroende på var spelaren skjuter
    switch(direction) {
      case "ArrowRight":
        this.shootSpritesheet.src = "sprites/Shooting_right_6.png";
        console.log("right");
        break;
      case "ArrowLeft":
        this.shootSpritesheet.src = "sprites/Shooting_left_6.png";
        console.log("left");
        break;
      case "ArrowUp":
      case "ArrowDown":
    }

    if (Date.now()/1000 - this.fireRateDelay > 1/this.fireRate) {
      console.log(Date.now)
      this.projectiles.push(new Projectile(this.x+16, this.y+16, direction, this.shotSpeed));
      this.fireRateDelay = Date.now()/1000;
    }
  }
}