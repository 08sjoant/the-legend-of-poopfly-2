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
let fiende1 = new character("Standardfiende", 10, 3, 3,  0, 800)

let keys = {
    w: false,
    s: false,
    d: false,
    a: false,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
}

document.onkeydown = function(e) {
    console.log(e)
    const key = e.key
    keys[key] = true
}

document.onkeyup = function(e) {
    console.log(e)
    const key = e.key
    keys[key] = false
}



function draw(timestamp) {
    if (timestamp - lastTimestamp < timestep) {
        // Vi ska vänta med att rita så vi avbryter funktionen.
        requestAnimationFrame(draw)
        return  
    }

    lastTimestamp = timestamp

    ctx.clearRect(0, 0, canvas.width, canvas.height,)


    if (keys.a || keys.d || keys.w || keys.s) {
        spritesheet.src = "Dude_Monster_Walk_6.png"
        framestotal = 6
    }
    else {
        spritesheet.src = "Dude_Monster_Idle_4.png"
        framestotal = 4 
    }

    if (keys.a) {
        sp1.xpos -= sp1.speed
    }

    if (keys.d) {
        sp1.xpos += sp1.speed
    }

    if (keys.w) {
        sp1.ypos -= sp1.speed
    }

    if (keys.s) {
        sp1.ypos += sp1.speed
    }


    ctx.drawImage(spritesheet, frameIndex * spritewidth, 0, spritewidth, spriteheight, sp1.xpos, sp1.ypos, spritewidth*5, spriteheight*5
    )

    frameIndex = (frameIndex + 1) % framestotal
    requestAnimationFrame(draw)
}

spritesheet.onload = requestAnimationFrame(draw)

function shoot(direction) {
    if (keys.ArrowRight) {
    }
}