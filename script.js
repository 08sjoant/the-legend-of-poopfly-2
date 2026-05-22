const canvas = document.getElementById("spelyta");
const ctx = canvas.getContext("2d");

// loop
let lastTimestamp = 0;
const maxFPS = 15;
const timestep = 1000 / maxFPS;


// input
const keys = {};

document.addEventListener("keydown", e => {
  keys[e.key.toLowerCase()] = true;

  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    player.shoot(e.key);
  }
});

document.addEventListener("keyup", e => {
  keys[e.key.toLowerCase()] = false;
});

// setup
let player = new Player();
let enemyCount = [];
for (i=0; i<5; i++) {
  enemyCount.push(new Enemy(Math.random() * 7 + 3, 5, 5));
}




// GAME LOOP
function gameLoop(timestamp) {
    if (timestamp - lastTimestamp < timestep) {
        requestAnimationFrame(gameLoop);
        return;
    }
    lastTimestamp = timestamp;

    // Clear screen
    ctx.fillStyle = "rgb(100,100,100)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update + draw
    player.update(); //uppdaterar både player och projektiler
    player.draw();

    for (e of enemyCount) {
      e.draw()
      e.update()
    }


    // Next sprite in the animation
    

    requestAnimationFrame(gameLoop);
    
}

requestAnimationFrame(gameLoop);


