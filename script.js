const canvas = document.getElementById("spelyta")
const ctx = canvas.getContext("2d")

let spritesheet = new Image()


const spritewidth = 32
const spriteheight = 32

let frameIndex = 0
let framestotal = 4

let lastTimestamp = 0,x 
    maxFPS = 15,
    timestep = 1000 / maxFPS

//how to walk

class Projectile {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.speed = 16;
    }
  
    update() {
        if (this.direction == "ArrowUp") {
            this.y += this.speed
            ctx.beginPath();
            ctx.arc(this.x, this.y, 0, 0, 2 * Math.PI);
            ctx.fillStyle = "black"
            ctx.fill();
        }
        else {if (this.direction = "ArrowDown") {
            this.y -= this.speed
            ctx.beginPath();
            ctx.arc(this.x, this.y, 0, 0, 2 * Math.PI);
            ctx.fillStyle = "black"
            ctx.fill();
            }
        }
    }
}

class character {
    constructor(name, speed, fire_rate, shot_speed, damage, xpos, ypos) {
        this.name = name;
        this.speed = speed;
        this.projectiles = [];
        this.fire_rate = fire_rate;
        this.shot_speed = shot_speed;
        this.damage = damage;
        this.xpos = xpos;
        this.ypos = ypos;
    }

    updateplayer() {
        for (let projectile of this.projectiles) {
            projectile.update();
        }
    }

    shoot(direction) {
    console.log("shoot")
    this.projectiles.push(new Projectile(this.xpos, this.ypos, direction));
    }
}


let sp1 = new character("Standardkaraktär", 20, 2, 0, 2, 3, 0, 200)
let fi1 = new character("Standardfiende", 15, 3, 0, 2, 3,  300, 400)


let keys = {
    w: false,
    s: false,
    d: false,
    a: false,
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
}

document.onkeydown = function(e) {
    console.log(e)
    const key = e.key
    keys[key] = true
    if (e.key == "ArrowUp" || e.key == "ArrowDown" || e.key == "ArrowLeft" || e.key == "ArrowRight"){
        sp1.shoot(e.key)
    }
}

document.onkeyup = function(e) {
    console.log(e)
    const key = e.key
    keys[key] = false
}


function moveEnemies(fiende) {
    const dx = sp1.xpos - fiende.xpos;
    const dy = sp1.ypos - fiende.ypos;
    const distance = Math.sqrt(dx * dx + dy * dy);

    fiende.xpos = fiende.xpos + (dx / distance) * fiende.speed;
    fiende.ypos = fiende.ypos + (dy / distance) * fiende.speed;

    ctx.drawImage(spritesheet, frameIndex * spritewidth, 0, spritewidth, spriteheight, fiende.xpos, fiende.ypos, spritewidth, spriteheight)
}


function draw(timestamp) {
    if (timestamp - lastTimestamp < timestep) {
        // Vi ska vänta med att rita så vi avbryter funktionen.
        requestAnimationFrame(draw)
        return  
    }

    lastTimestamp = timestamp

    ctx.clearRect(0, 0, canvas.width, canvas.height,)

    moveEnemies(fi1)
    sp1.updateplayer()

    for (i=0; i<sp1.projectiles; i++) {
        bullet.update();
    }

    

    if (keys.a || keys.d || keys.w || keys.s) {
        spritesheet.src = "Dude_Monster_Walk_6.png"
        framestotal = 6
    }
    else {
        spritesheet.src = "Dude_Monster_Idle_4.png"
        framestotal = 4 
    }

    if (keys.a) {sp1.xpos -= sp1.speed}
    if (keys.d) {sp1.xpos += sp1.speed}
    if (keys.w) {sp1.ypos -= sp1.speed}
    if (keys.s) {sp1.ypos += sp1.speed}


    ctx.drawImage(spritesheet, frameIndex * spritewidth, 0, spritewidth, spriteheight, sp1.xpos, sp1.ypos, spritewidth, spriteheight)

    frameIndex = (frameIndex + 1) % framestotal
    requestAnimationFrame(draw)
}

spritesheet.onload = requestAnimationFrame(draw)