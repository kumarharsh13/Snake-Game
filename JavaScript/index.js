// Game Constants and Varibales
let inputDir = { x: 0, y: 0 };    // Creating a direction object
const musicSound = new Audio('../Snake-Game/Sounds/music.mp3');  
const foodSound = new Audio('../Snake-Game/Sounds/food.mp3');
const gameOverSound = new Audio('../Snake-Game/Sounds/gameover.mp3');
const moveSound = new Audio('../Sounds/move.mp3');
let speed = 20;   // Speed at which Snkaes move by default
let score = 0;
let lastPaintTime = 0;   // Last Rendered time
let snakeArr = [         // Creating a array for snake body and the initial co-oridinates
    { x: 13, y: 15 }
];

food = { x: 6, y: 7 };   // Creating a object for food with the initial co-oridinates

// Game Functions
function main(ctime) {

    /* requestAnimationFrame function is used to incorporate amazing and simple animations, 
    it takes one parameter with is used for stoping the animation until the users wants.  */
    window.requestAnimationFrame(main);  
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) return; //console.log(ctime)
    lastPaintTime = ctime;
    gameEngine();
}

// Function to check if snake collide in it self
function isCollide(snake) {  
    
    // Snake eat itself;
    for (let i = 1; i < snakeArr.length; i++) {
        
        //if co-oridinates of Snake's head matchs with its body means collision occured
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {  
            return true;
        }
    }

    // Snake collide with wall
    // if co-oridinates of Snake's head matchs with walls means collision occured
    if (snake[0].x >= 50 || snake[0].x <= 0 || snake[0].y >= 50 || snake[0].y <= 0) { 
        return true;
    }

    return false;
}

function gameEngine() {
    // Part 1: Updating the snake array & food

    // If collision occurs, reset the game to its initial values
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        speed=20;
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }

    // If food is consumed, increment score and regenerate food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;

        // If older High Score get surpassed, update the high score
        if (score>highscoreval) {
            highscoreval = score;
            localStorage.setItem("highScore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "High Score: " + highscoreval;
        }

        // If current score is multiple of 10 increase the speed of snake
        if(score%10==0)
            speed+=10;
        scoreBox.innerHTML = "Score: " + score;

        // Increasing the length of the snake after consuming the food
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        
        // Regenating the food at any random position on the given grid
        let a = 1;
        let b = 49;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Moving the snake 
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };   // Creating a shallow copy
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display/Render the snake and food
    // Displaying Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');   // Creating a new element for snake to get displayed
        snakeElement.style.gridRowStart = e.y;    
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) snakeElement.classList.add('head');   // if there is only head present, add it to the screen
        else snakeElement.classList.add('snake');  
        board.appendChild(snakeElement);   // appending the snake element in the board 
    });

    // Displaying Food
    foodElement = document.createElement('div');   // creating element for food
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main Logic
musicSound.play();  // Star playing music sound
let highScore = localStorage.getItem("highScore")  // getItem() function returns the specified value of a storage object 
if (highScore === null) {
    highscoreval = 0;
    localStorage.setItem("highScore", JSON.stringify(highscoreval));  // setItem() function used to set specified value of a storage object 
}                                                                     // stringify() function is used to convert the given falue to string
else {
    highscoreval = JSON.parse(highScore);
    highscoreBox.innerHTML = "High Score: " + highScore;
}

/* requestAnimationFrame function is used to incorporate amazing and simple animations, 
    it takes one parameter with is used for stoping the animation until the users wants.  */
window.requestAnimationFrame(main);    
window.addEventListener('keydown', e => {    // Firing an EventListener on pressing any key on the keyborad
    inputDir = { x: 0, y: 1 } // Start The Game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});