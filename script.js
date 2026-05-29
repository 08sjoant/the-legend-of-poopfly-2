let highScore = 0

//skapa canvas med bakgrund:
const canvas = document.getElementById("spelyta");
const ctx = canvas.getContext("2d");

const background = new Image(); //skapar en bakgrund
background.src = "/sprites/tlop2backg-mmjukmala.png"; //väljer vilken bild den bakgrunden ska ha. 


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

  if (e.key == "r") setupGame(); //Man kan alltid starta om spelet med knappen "R". Till exempel om man är missnöjd med sin start.
});

document.addEventListener("keyup", e => { //tangenter blir false när de släpps. Annars hade man inte kunnat sluta gå.
  keys[e.key.toLowerCase()] = false;
});



// setup

function setupGame() { //spelet skapas via en funktion så att vi enkelt kan anropa funktionen när spelaren förlorar, så att spelaren kan starta om spelet utan att refresha hemsidan.
  console.log("setupGame");
  
  timeWhenSetup = Date.now() //skapar tiden då spelet började
  isAlive = true;
  player = new Player();  //skapar spelaren från klassen Player för att enkelt modifiera förmågor hos spelaren.
  //player kunde varit ett objekt utan klass, då vi endast har en spelare med bestämda förmågovärden. Vi valde dock att göra Player till en klass så att spelaren enkelt nollställas. Dessutom gör detta det lätt för oss att senare (efter projektet) kunna implementera val av karaktärer med olika förmågor.
  player.shootSpritesheet.src = "sprites/player_aim/Shooting_left_6.png"; //Ger spelaren en arm innan hen ahr skjutit första gången. Detta är en separat spritesheet för att kunna kombinera riktingen av att skjuta med riktningen spelaren går.

  requestAnimationFrame(gameLoop); //påbörja gameLoop

  enemyCount = []; //fiender skapas senare i denna array. En array gör det enkelt att lägga till fiende-objekt byggda från klassen Enemy.
  killCount = 0; //skapar variabeln killCount

  score = document.getElementById("score"); //sparar score från HTML-document.
  highScoreDisplay = document.getElementById("highScore"); //sparar highScore från HTML-document.

  for (i=0; i<5; i++) { //skapar fiender i början av spelet enligt ett värde. Just nu 5
    enemyCount.push(new Enemy(Math.random() * 7 + 3, 5, 5)); //fiender skapas enligt constructors i klassen Enemy, med slumpad hastighet mellan 3 och 7.
  }  
}


setupGame(); //skapar spelet en första gång.


function BirthEnemy() { //skapar fler fiender
  enemyCount.push(new Enemy(Math.random() * 7 + 3 + timePlayed/10, 5 + timePlayed/30, 5 + timePlayed/30)); //fiender skapas enligt constructors i klassen Enemy, med slumpad hastighet mellan 3 och 7 + 1 var tionde sekund. Hälsa och skada ökar med 1 var trettionde sekund.
  }

intervalID = window.setInterval(BirthEnemy, 3000); //anropar funktionen BirthEnemy var tretusende millisekund (3:e sekund)


// GAME LOOP
function gameLoop(timestamp) { //spelet bygger på loopande teckningar. Varje frame målas allt som visas på bilden. Det är så spelet är byggt.
    if (timestamp - lastTimestamp < timestep) {
        requestAnimationFrame(gameLoop);
        return;
    }

    lastTimestamp = timestamp;


    //Kolla hur länge spelet körts:
    timePlayed = (Date.now() - timeWhenSetup)/1000 //dividerat med 1000 för enkel användning i sekunder.


    // Clear screen
    ctx.drawImage(background, 0, 0);   
    

    // Update + draw
    //fiender ritas före spelaren eftersom att player.draw även ritar hälsomätare för spelaren. Om den ritades innan fienderna hade de kunnat gå "över" istället för "under" mätaren.
    for (let e of enemyCount) { //för varje fiende på skärmen.
      e.update(); //updaterar den fienden (bland annat position).
      e.draw(); //målar fienden.
    }

    player.update(); //uppdaterar både player och projektiler som är skapade av player. Player finns i en annan fil för att göra koden mycket mer läsbar och enkel att förstå.
    player.draw(); //ritar player


    if (isAlive) requestAnimationFrame(gameLoop); //upprepar animationen om spelaren lever.
}