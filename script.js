const TILE=32;
blocks[captured-1].classList.add("active");

if(captured===8) nextLevel();


function nextLevel(){

level++;

if(level>=maps.length) return;

captured=0;
abilityUnlocked=false;
abilityActive=false;

loadLevel();

}

window.addEventListener("keydown",e=>{

if(e.key==="ArrowUp") direction="up";
if(e.key==="ArrowDown") direction="down";
if(e.key==="ArrowLeft") direction="left";
if(e.key==="ArrowRight") direction="right";

if(e.key===" "){

if(abilityUnlocked) abilityActive=true;

}

});

const stick=document.getElementById("stick");

stick.addEventListener("touchmove",e=>{

let x=e.touches[0].clientX;
let y=e.touches[0].clientY;

if(x<80) direction="left";
if(x>120) direction="right";
if(y<80) direction="up";
if(y>120) direction="down";

});

function loop(){

ctx.clearRect(0,0,canvas.width,canvas.height);

moveSnake();
collision();

drawTerritory();
drawMap();
drawNodes();
drawSnake();

requestAnimationFrame(loop);

}

function startGame(){

captured=0;
loadLevel();
drawProgress();
loop();

}

const cover=document.getElementById("coverScreen");
const menu=document.getElementById("menuScreen");
const game=document.getElementById("gameScreen");

startBtn.onclick=()=>{
cover.classList.remove("active");
menu.classList.add("active");
};

playBtn.onclick=()=>{
menu.classList.remove("active");
game.classList.add("active");
startGame();
};
