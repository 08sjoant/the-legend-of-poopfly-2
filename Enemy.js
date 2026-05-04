class Enemy {
    constructor(speed, damage, health) {
        this.x = Math.random() * 1000;
        this.y = Math.random() * 500;
        this.speed = speed;
        this.damage = damage;
        this.health = health;

        this.spriteHeight = 32;
        this.spriteWidth = 32;
    }

    draw() {
        ctx.drawImage(spritesheet, frameIndex * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
    }

    update() {
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (dx > dy) {
            if (dx > 0) console.log("gå höger")
            else console.log("gå vänster")
        }

        else {
            if (dy > 0) console.log("gå ner")
            else console.log("gå upp")
        }
        

        this.x = this.x + (dx / distance) * this.speed;
        this.y = this.y + (dy / distance) * this.speed;

        if (((this.x+16) - (player.x+16))**2 + ((this.y+16) - (player.y+16))**2 < 256) {
            console.log("game over")
        }
    }
}