class Player {
  constructor() {
    //sprite
    this.runningDirection = ""
    this.spriteWidth = 64;
    this.spriteHeight = 64;
    this.frameIndex = 0; 
    this.frameTotal = 4; 
    this.spritesheet = new Image();
    this.shootSpritesheet = new Image();

    //rörelse
    this.x = (canvas.width / 2) - (this.spriteWidth / 2); //startposition mitt på skärmen
    this.y = (canvas.height / 2) - (this.spriteHeight / 2); //startposition mitt på skärmen
    this.speed = 30;

    //array med alla projektiler som ska uppdateras, för att lätt lägga till och ta bort projektiler.
    this.projectiles = []; 

    //attackvärden
    this.fireRate = 4; //antal gånger man kan skjuta per sekund.
    this.fireRateDelay = 0; //tillfällig delay för att skjuta. Nödvändig variabel för fire rate.
    this.shotSpeed = 20; //antal pixlar skotten färdas.
    this.damage = 2;

    //hälsa och odödlighetstid
    this.maxHealth = 30;
    this.currentHealth = 30;
    this.invulnTime = 0
  }


  draw() { //målar spelaren
    ctx.drawImage(this.spritesheet, this.frameIndex * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight); //ritar kroppen
    ctx.drawImage(this.shootSpritesheet, this.frameIndex * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight); //ritar armen.
    this.frameIndex = (this.frameIndex + 1) % this.frameTotal; //uppdaterar frameräkning som används av olika delar av spelet. Spelaren har en egen frameindex för att olika av spelarens spritesheets har olika frameTotal.

    //måla hälsomätare:
    ctx.fillStyle = "darkred";
    ctx.fillRect(0, 0, this.maxHealth*5, 30);
    ctx.fillStyle = "forestgreen";
    ctx.fillRect(0, 0, this.currentHealth*5, 30);
  }


  update() { //uppdaterar spelaren.
    this.spritesheet.src = "sprites/Running_sheet_down_6.png" //standard spritesheet om inget annat anges.
    this.frameTotal = 4; //mängden bilder i det spritesheetet.
    let xSpeed = 0; //om inget annat anges flyttar man sig 0 på x-axeln.
    let ySpeed = 0; //samma gäller y-axeln.


    //hälsa:
    for (i=0; i<enemyCount.length; i++) { //för varje fiende i array enemyCount:
      if (Date.now() - this.invulnTime > 750) { //om tiden nu i millisekunder minus tiden då spelaren sist tog skada är över 0.75 sekunder kan spelaren ta skada. Detta finns som funktion för att spelaren inte ska dö omedelbart då den nuddar en fiende, då spelaren annars hade tagit skada varje frame.
        if (((this.x + 32) - (enemyCount[i].x + 16))**2 + ((this.y + 32) - (enemyCount[i].y + 16))**2 < 512) {//pythagoras sats med mitten av spelaren och mitten av fienden. Jag undviker kvadratrötter då det är mer krävande för javascript.
          this.currentHealth -= enemyCount[i].damage //hälsa minskar med fiendens skada.
          this.invulnTime = Date.now() //Sparar tiden då spelaren tog skada i millisekunder 

          if (!this.currentHealth > 0) { //om spelarens hälsa är noll eller mindre förlorar spelaren.
            console.log("GAME OVER") //skriver tillfälligt ut GAME OVER i konsollen
          }
        }
      }
    }


    //kollar för WASD om tangent är nedtryckt och spelaren inte försöker gå utanför kartan.
    if (keys["a"] && this.x > 0) { 
      xSpeed -= this.speed; //flyttar negativt på x-axeln (går vänster)
      this.spritesheet.src = "sprites/Running_sheet_left_6.png"; 
      this.frameTotal = 6;
      this.runningDirection = "left"
    }
    if (keys["d"] && this.x + this.spriteWidth < canvas.width) {
      xSpeed += this.speed; //flyttar positivt på x-axeln (går höger)
      this.spritesheet.src = "sprites/Running_sheet_right_6.png";
      this.frameTotal = 6;
      this.runningDirection = "right"
    }
    if (keys["w"] && this.y > 0) {
      ySpeed -= this.speed; //flyttar negativt på y-axeln (går upp)
      this.spritesheet.src = "sprites/Running_sheet_up_6.png";
      this.frameTotal = 6;
      this.runningDirection = "up"
    }
    if (keys["s"] && this.y + this.spriteHeight < canvas.height) {
      ySpeed += this.speed; //flyttar positivt på y-axeln (går ner)
      this.spritesheet.src = "sprites/Running_sheet_down_6.png";
      this.frameTotal = 6;
      this.runningDirection = "down"
    }

    //flyttar på spelaren med den hastighet han får av de olika riktningarna:
    this.x += xSpeed;
    this.y += ySpeed;


    //Uppdaterar projektiler
    for (let p of this.projectiles) { //för varje projektil som ligger i spelarens array this.projectiles:
      p.update(); //uppdaterar projektilen
      p.draw(); //måla projektilen


    
    }
  }


  shoot(direction) { //funktionen shoot ligger i spelaren, den anropas i script.js när piltangenterna trycks ned.
    
    //Spriteändringar beroende på var spelaren skjuter
    switch(direction) {
      case "ArrowRight": //spritesheet för att skjuta höger:
        this.shootSpritesheet.src = "sprites/Shooting_right_6.png";
        break;

      case "ArrowLeft": //spritesheet för att skjuta vänster:
        this.shootSpritesheet.src = "sprites/Shooting_left_6.png";
        break;

      case "ArrowUp": //spritesheet för att skjuta upp:
      case "ArrowDown": //spritesheet för att skjuta ner:
    }


    //Skapar armborstbult:
    if (Date.now()/1000 - this.fireRateDelay > 1/this.fireRate) { //kollar om tiden nu i sekunder minus tiden spelaren sist skjöt i sekunder är större än minsta tidsmellanrummet mellan projektiler (this.fireRate)
      this.projectiles.push(new Projectile(this.x+16, this.y+16, direction, this.shotSpeed)); //skapar projektile från klassen Projectile i spelarens array this.projectiles.
      this.fireRateDelay = Date.now()/1000; //sparar tiden då spelaren skjöt.
    }
  }
}