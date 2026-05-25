const canvas = document.getElementById("spelyta");
const ctx = canvas.getContext("2d");


// loop
let lastTimestamp = 0;
const maxFPS = 15;
const timestep = 1000 / maxFPS;



// input
const keys = {};

document.addEventListener("keydown", e => { //tangenter blir true när de trycks ner. Vi kan då kolla om någonting ska hända när en tangent trycks ner.
  keys[e.key.toLowerCase()] = true;

  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) { //kollar om någon av piltangenterna trycks ner.
    player.shoot(e.key); //skjuter i sådana fall utifrån en funktion i player.
  }
});

document.addEventListener("keyup", e => { //tangenter blir false när de släpps. Annars hade man inte kunnat sluta gå.
  keys[e.key.toLowerCase()] = false;
});



// setup
let player = new Player(); //skapar spelaren från klassen Player för att enkelt modifiera förmågor hos spelaren.
player.shootSpritesheet.src = "sprites/player_aim/Shooting_left_6.png" //Ger spelaren en arm innan hen ahr skjutit första gången. Detta är en separat spritesheet för att kunna kombinera riktingen av att skjuta med riktningen spelaren går.

let enemyCount = []; //fiender skapas senare i denna array. En array gör det enkelt att lägga till fiende-objekt byggda från klassen Enemy.
let killCount = 0 //skapar variabeln killCount

for (i=0; i<5; i++) { //skapar fiender i början av spelet enligt ett värde. Just nu 5
  enemyCount.push(new Enemy(Math.random() * 7 + 3, 5, 5)); //fiender skapas enligt constructors i klassen Enemy, med slumpad hastighet mellan 3 och 7.
}

function BirthEnemy() { //skapar fler fiender
  enemyCount.push(new Enemy(Math.random() * 7 + 3, 5, 5)); //fiender skapas enligt constructors i klassen Enemy, med slumpad hastighet mellan 3 och 7.
}

let intervalID = window.setInterval(BirthEnemy, 2500); //anropar funktionen BirthEnemy var tvåtusenfemhundrade millisekund (2.5:e sekund)



// GAME LOOP
function gameLoop(timestamp) {
    if (timestamp - lastTimestamp < timestep) {
        requestAnimationFrame(gameLoop);
        return;
    }
    lastTimestamp = timestamp;

    // Clear screen
    ctx.fillStyle = "rgb(100,100,100)"; //bakgrundsfärg i canvas.
    ctx.fillRect(0, 0, canvas.width, canvas.height); //målar bakgrunden i canvas.

    // Update + draw
    player.update(); //uppdaterar både player och projektiler som är skapade av player. Player finns i en annan fil för att göra koden mycket mer läsbar och enkel att förstå.
    player.draw(); //ritar player

    for (e of enemyCount) { //för varje fiende på skärmen.
      e.update() //updaterar den fienden (bland annat position).
      e.draw() //målar fienden.
    }


    requestAnimationFrame(gameLoop); //upprepar animationen.

    
}

requestAnimationFrame(gameLoop);