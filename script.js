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



let numberOfProjectiles = 0

class character {
    constructor(name, speed, fire_rate, damage, xpos, ypos) {
        this.name = name;
        this.speed = speed;
        this.fire_rate = fire_rate;
        this.damage = damage;
        this.xpos = xpos;
        this.ypos = ypos;
    }
}

let sp1 = new character("Standardkaraktär", 20, 2, 3, 0, 200)
let fi1 = new character("Standardfiende", 15, 3, 3,  300, 400)
let fi2 = new character("Standardfiende", 15, 3, 3,  300, 500)
let fi3 = new character("Standardfiende", 15, 3, 3,  300, 600)
let fi4 = new character("Standardfiende", 15, 3, 3,  300, 700)
let fi5 = new character("Standardfiende", 15, 3, 3,  300, 800)


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
        numberOfProjectiles += 1
        shoot(e.key)
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
    moveEnemies(fi2)
    moveEnemies(fi3)
    moveEnemies(fi4)
    moveEnemies(fi5)

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
