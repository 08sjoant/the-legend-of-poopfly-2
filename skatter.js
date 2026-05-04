class skatt {
    kvalitet = 1;
    modArMult = false;
    constructor(namn, kpMod, styMod, fireRateMod, shotSpeedMod, beskrivning, nivaMod, synergiID, textureID) {
        this.namn = namn;
        this.kpMod = kpMod;
        this.styMod = styMod;
        this.fireRateMod = fireRateMod;
        this.shotSpeedMod = shotSpeedMod;
        this.beskrivning = beskrivning;
        this.nivaMod = nivaMod;
        this.synergiID = synergiID;
        this.textureID = textureID;
    }
}

let k1 = [
    new skatt("Teleskop", 0, 0, 0, 0, '"Ökad sikt"', 0, 0, 0)
]

let k2 = [
    new skatt('Raket i en burk', 0, 4, -0.5, 0.5, '"Jag förstår inte riktigt hur man fick in den..."', 0, 0, 1),
]

for (const i in k2) {
    i.kvalitet = 2
}

let k3 = [
    new skatt('Sten', -1, 1, 3, 2, '"Hur kan en sten gråta?!"', 0, 0, 2),
]

for (const i in k3) {
    i.kvalitet = 3
}

let k4 = [
    new skatt('Helig utplånare', 0, 2, 0.1, 1, '"Hellre detta än Universumsförstörare"', 1, 4, 3),
    new skatt('Universumförstare', 0, 0.1, 2, 1, '"Hellre detta än Helig utplånare"', 1, 4, 4),
]

for (const i in k4) {
    i.kvalitet = 4
    i.modArMult = true
}