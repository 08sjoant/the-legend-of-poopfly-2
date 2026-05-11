let rumsalternativ = ["Lätt", "Medel", "Svår", "Boss", "Fälla", "Läkerum"]

class rum {
constructor(rumstyp, riktning, modifierare) {
    this.rumstyp = rumstyp;
    this.riktning = riktning;
    this.modifierare = modifierare;

    //sprite
    this.spriteWidth = 32;
    this.spriteHeight = 32;
    this.frameIndex = 0;
    this.frameTotal = 3;
    this.dorrsprite = new Image();
}
draw() {
        let width = document.getElementById("spelyta").width
        let height = document.getElementById("spelyta").height
        ctx.fillStyle = "rgb(255, 0, 0)";
        this.dorrsprite.src = "sprites/Dörrar_4(UNVH).png"
    if (this.riktning == "x"){
        console.log("x")
        ctx.fillRect(width*this.modifierare, height/2,(width * this.modifierare)+32,(height/2)+32)
        ctx.drawImage(this.dorrsprite, this.frameIndex * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, width * this.modifierare, height/2, (width * this.modifierare) + this.spriteWidth, (height/2)+this-this.spriteHeight);
    }
    else if (this.riktning == "y"){
        console.log("y")
    }
}
}

let dorr1 = new rum("Lätt", "x", 0)
let dorr2 = new rum("Medel", "x", 1)
