let rumsalternativ = ["Lätt", "Medel", "Svår", "Boss", "Fälla", "Läkerum"]

class rum {
constructor(rumstyp, riktning, modifierare) {
    this.rumstyp = rumstyp;
    this.riktning = riktning;
    this.modifierare = modifierare;
}
draw() {
        let width = document.getElementById("spelyta").style.width
        let height = document.getElementById("spelyta").style.height
        console.log(width)
        ctx.fillStyle = "rgb(255, 0, 0)";
    if (this.riktning == "x"){
        console.log("x")
        ctx.fillRect(width * this.modifierare, height/2 ,width * this.modifierare + 1, height/2 + 1)
    }
    else if (this.riktning == "y"){
        console.log("y")
        ctx.fillRect(width/2, height * this.modifierare ,width/2 + 2,height * this.modifierare + 2)
    }
}
}

let dörr1 = new rum("Lätt", "x", -1)
