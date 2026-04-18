const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
    { x: 10, y: 10 }
];

let velocityX = 0;
let velocityY = 0;

let foodX = 5;
let foodY = 5;

let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    }
    if (event.key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    }
    if (event.key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    }
    if (event.key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function gameLoop() {
    update();
    draw();
}

function update() {
    const head = {
        x: snake[0].x + velocityX,
        y: snake[0].y + velocityY
    };

    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= tileCount ||
        head.y >= tileCount
    ) {
        resetGame();
        return;
    }

    for (let part of snake) {
        if (head.x === part.x && head.y === part.y) {
            resetGame();
            return;
        }
    }

    snake.unshift(head);

    if (head.x === foodX && head.y === foodY) {
        score++;
        document.getElementById("score").textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "lime";
    for (let part of snake) {
        ctx.fillRect(
            part.x * gridSize,
            part.y * gridSize,
            gridSize - 2,
            gridSize - 2
        );
    }

    ctx.fillStyle = "red";
    ctx.fillRect(
        foodX * gridSize,
        foodY * gridSize,
        gridSize - 2,
        gridSize - 2
    );
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    velocityX = 0;
    velocityY = 0;
    score = 0;
    document.getElementById("score").textContent = score;
}

setInterval(gameLoop, 100);