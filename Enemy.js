class Enemy {
    constructor(speed, damage, health) {
        this.x = Math.random() * 1000;
        this.y = Math.random() * 500;
        this.enemySpritesheet = new Image();

        this.speed = speed;
        this.damage = damage;
        this.health = health;

        this.spriteHeight = 32;
        this.spriteWidth = 32;
    }

    draw() {
        ctx.drawImage(this.enemySpritesheet, frameIndex * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
    }

    update() {
        this.enemySpritesheet.src = "sprites/Dude_Monster_Idle_4.png"
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (dx*dx > dy*dy) {
            if (dx > 0) this.enemySpritesheet.src = "sprites/Dude_Monster_Walk_6.png"   //höger
            else this.enemySpritesheet.src = "sprites/Dude_Monster_Idle_4.png"          //vänster
        }

        else {
            if (dy > 0) this.enemySpritesheet.src = "sprites/Dude_Monster_Idle_4.png"   //ner
            else this.enemySpritesheet.src = "sprites/Dude_Monster_Walk_6.png"          //upp
        }
        

        this.x = this.x + (dx / distance) * this.speed;
        this.y = this.y + (dy / distance) * this.speed;

        if (((this.x+16) - (player.x+16))**2 + ((this.y+16) - (player.y+16))**2 < 256) {
            console.log("game over")
        }
    }
}