class Projectile {
    constructor(x, y, direction, shot_speed) {
      this.x = x;
      this.y = y;
      this.direction = direction; 
      this.shotSpeed = shot_speed; //hastigheten av projektilen
    }

    update() {
      switch(this.direction) { //switch som kollar riktingen skottet ska färdas.
        case "ArrowUp": 
          this.y -= this.shotSpeed;
          break;

        case "ArrowDown": 
          this.y += this.shotSpeed;
          break;

        case "ArrowLeft": 
          this.x -= this.shotSpeed;
          break;

        case "ArrowRight": 
        this.x += this.shotSpeed;
        break;
      }



      for (i in enemyCount) { //för varje fiende:
        if (((this.x+2) - (enemyCount[i].x+16))**2 + ((this.y+2) - (enemyCount[i].y+16))**2 < 256) { //ungefär samma pythagoras sats som kollar avståndet mellan fienden och spelaren:
          enemyCount[i].health -= player.damage //fienden tar skada lika med player.damage
          player.projectiles.splice(player.projectiles.indexOf(this), 1) //tar bort just den här projektilen från array player.projectile. Det här är där array underlättar som "hus" åt projektiler och fiender.
          
          if (enemyCount[i].health < 1) { //kollar om fienden dör
            enemyCount.splice(i, 1) //tar bort fienden
        }
        }
      }
    }

    draw() { //målar skottet
      ctx.beginPath();
      ctx.fillStyle = 'black'; //fyllnadsfärg: svart
      ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI); //skottet får en radie och blir en cirkel
      ctx.fill(); //fyller formen med färg
    }
}