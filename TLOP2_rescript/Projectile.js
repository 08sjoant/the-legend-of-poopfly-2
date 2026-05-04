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

      for (i in enemieCount) {
        if ((((this.x+32)/2) - ((enemieCount[i].x+32)/2))**2 + (((this.y+32)/2) - ((enemieCount[i].y+32)/2))**2 < 200) {
          enemieCount.pop(i)
        }
      }
    }

    draw() {
      ctx.fillStyle = "black";
      ctx.fillRect(this.x, this.y, 5, 5);
    }
}