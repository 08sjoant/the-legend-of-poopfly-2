class Enemy {
    constructor(speed, damage, health) {
        //slumpmässig position.
        this.x = Math.random() * 1000; 
        this.y = Math.random() * 500;
        
        //attackvariabler och hastighet
        this.speed = speed;
        this.damage = damage;
        this.health = health;

        //sprite
        this.enemySpritesheet = new Image();
        this.spriteHeight = 32;
        this.spriteWidth = 32; 

        //standard för mäng frame och frameIndex börjar på 0
        this.frameIndex = 0; 
        this.frameTotal = 4;
    }

    draw() { //ritar fienden
        ctx.drawImage(this.enemySpritesheet, this.frameIndex * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
        this.frameIndex = (this.frameIndex + 1) % this.frameTotal;
    }

    update() { //uppdaterar fienden.
        const dx = player.x - this.x; //avstånd till spelaren i x-led
        const dy = player.y - this.y; //avstånd till spelaren i y-led
        const distance = Math.sqrt(dx * dx + dy * dy); //Pythagoras sats för att få distansen, omvandlar också resultatet positivt.

        if (dx > 0) this.enemySpritesheet.src = "sprites/snubbmonster/Dude_Monster_Walk_Right_6.png";    //om xförändringen är positiv: höger
        else this.enemySpritesheet.src = "sprites/snubbmonster/Dude_Monster_Walk_Left_6.png";            //annars: vänster
        

        //flyttar x- och y-koordinater mot spelaren med fiendens hastighet.
        this.x = this.x + (dx / distance) * this.speed; 
        this.y = this.y + (dy / distance) * this.speed; 
    }
}