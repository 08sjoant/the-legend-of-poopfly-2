class Enemie {
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

        this.x = this.x + (dx / distance) * this.speed;
        this.y = this.y + (dy / distance) * this.speed;
    }
}