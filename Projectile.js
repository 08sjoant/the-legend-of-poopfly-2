class Projectile {
    constructor(x, y, direction, shot_speed) {
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.shotSpeed = shot_speed;
    }

    update() {
      if (this.direction === "ArrowUp") this.y -= this.shotSpeed;
      if (this.direction === "ArrowDown") this.y += this.shotSpeed;
      if (this.direction === "ArrowLeft") this.x -= this.shotSpeed;
      if (this.direction === "ArrowRight") this.x += this.shotSpeed;

      for (i in enemyCount) { //för varje fiende:
        if (((this.x+5) - (enemyCount[i].x+16))**2 + ((this.y+5) - (enemyCount[i].y+16))**2 < 256) { //om den nuddar fienden:
          enemyCount[i].health -= player.damage //fienden tar skada lika med player.damage
          player.projectiles.splice(player.projectiles.indexOf(this), 1) //tar bort just den här projektilen från array
          
          if (enemyCount[i].health < 1) { //kollar om fienden dör
            enemyCount.splice(i, 1) //tar bort fienden
        }
        }
      }
    }

    draw() {
      ctx.fillStyle = "black";
      ctx.fillRect(this.x, this.y, 10, 10);
    }
}