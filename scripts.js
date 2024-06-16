function createPlayer(name, marker) {
    return { name, marker };
}

const player1 = createPlayer("player1", "X");
const player2 = createPlayer("player2", "O");

let playCount = 0;

/* Render gameboard */
function displayGame() {
    const board = document.querySelector(".board");
    board.addEventListener("click", playGame);
}

displayGame();

/* Game logic */
function playGame(e) {
    if ((playCount === 0 || playCount % 2 === 0) && e.target.innerText === "") {
        e.target.innerText = player1.marker;
        playCount++;
    } else if (playCount % 2 !== 0 && e.target.innerText === "") {
        e.target.innerText = player2.marker;
        playCount++;
    } else {
        return;
    }
    console.log(playCount);
} 