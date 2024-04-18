// HTML elements
const gameboard = document.getElementById("gameboard");
const scoreSnake = document.getElementById("score-snake");
const startButton = document.getElementById("start");
const gameOverSign = document.getElementById("game-over");

//Game settings
const boardSize = 10;
const gameSpeed = 100;
const squareTypes = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2,
};
const directions = {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowLeft: -1,
    ArrowRight: 1,
};
// por los numeros de las posiciones de cada square
// Game variables
let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;

// para rellenar cada cuadrado del tablero: parametros de square(posicion del cuadrado) y type(emptysquare, snakesquare, foodsquare)
const createSquare = (square, type) => {
    const [row, column] = square.split("");
    boardSquares[row][column] = squareTypes[type]; // se rellena la fila y columna especifica con el tipo de square que nos pasa la funcion
    const squareElement = document.getElementById(square);
    squareElement.setAttribute("class", `square ${type}`);

  // se agrega un nuevo cuadrado
    if ((type = "emptySquare")) {
    emptySquares.push(square);
    } else {
    // se saca un cuadrado
    if (emptySquares.indexOf(square) !== -1) {
        emptySquares.splice(emptySquares.indexOf(square), 1);
    }
    }
};

// para iterar sobre cada lugar de los rows
createGameboard = () => {
    boardSquares.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
        const squareValue = `${rowIndex}${columnIndex}`;
        const squareElement = document.createElement("div");
        squareElement.setAttribute("class", "square emptySquare");
        squareElement.setAttribute("id", squareValue);
        gameboard.appendChild(squareElement);
        emptySquares.push(squareValue);
        });
    });
};

const createSnake = () => {
    snake.forEach(square => createSquare(square, "snakeSquare"));
};

const setDirection = newDirection => {
    direction = newDirection;
};

const directionEvent = key => {
    switch (key.code) {
    case "ArrowUp":
        direction != "ArrowDown" && setDirection(key.code);
        break;
    case "ArrowDown":
        direction != "ArrowUp" && setDirection(key.code);
        break;
        case "ArrowLeft":
        direction != "ArrowRight" && setDirection(key.code);
        break;
    case "ArrowRight":
        direction != "ArrowLeft" && setDirection(key.code);
        break;
    }
};

const moveSnake = () => {
    const newSquare = String(
    Number(snake[snake.length - 1]) + directions[direction]).padStart(2, "0"); // le agrega un 0 si tiene un solo numero
    const [row, column] = newSquare.split("");

    if (
    newSquare < 0 ||
    newSquare > boardSize * boardSize ||
    (direction === "ArrowRight" && column == 0) ||
    (direction === "ArrowLeft" && column == 9) ||
    boardSquares[row][column] === squareTypes.snakeSquare) {
    gameOver();
    } else {
    snake.push(newSquare);
    if (boardSquares[row][column] === squareTypes.foodSquare) {
        addFood();
    } else {
        const emptySquare = snake.shift();
        createSquare(emptySquare, "emptySquare");
    }
    createSnake();
    }
};

const createRandomFood = () => {
    const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    createSquare(randomEmptySquare, "foodSquare");
};

const addFood = () => {
    score++;
    updateScore();
    createRandomFood();
};

const updateScore = () => {
    scoreSnake.innerText = score;
};

const gameOver = () => {
    gameOverSign.style.display = "block";
    clearInterval(moveInterval);
    startButton.disabled = false;
};

// para setear todas las variables cuando el juego inicie
const setGame = () => {
    snake = ["00", "01", "02", "03"];
    score = snake.length;
    direction = "ArrowRight";
    boardSquares = Array.from(Array(boardSize), () =>
    new Array(boardSize).fill(squareTypes.emptySquare)); // para generar un arreglo de 2D: de 10x10
    console.log(boardSquares);
  // para resetear ek juego
    gameboard.innerHTML = "";
    emptySquares = [];
    createGameboard();
};

const startGame = () => {
    setGame();
    gameOverSign.style.display = "none";
    startButton.disabled = true;
    createSnake();
    updateScore();
    createRandomFood();
    document.addEventListener("keydown", directionEvent);
    moveInterval = setInterval(() => moveSnake(), gameSpeed);
  // setea un intervalo de 100ml (gamespeed) para que la snake se mueva
};

startButton.addEventListener("click", startGame);
