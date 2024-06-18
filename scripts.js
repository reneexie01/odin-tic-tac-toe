// gameboard module

const gameboard = (function Gameboard() {
    const board = ["","","","","","","","",""];

    const renderGameboard = () => board;

    const addMark = function(index, mark) {
        if (board[index] === "") {
            board[index] = mark;
            playCount++;
        } else {
            console.log(`Invalid move. Try again.`)
            return;
        }
    }

    return { renderGameboard, addMark };
})();

// person factory function

function createPerson(name, mark) {
    return { name, mark };
}

let playCount = 0 // must address this global variable

// displayController module

const displayController = (function displayController() {
    const player1 = createPerson("Jack", "X");
    const player2 = createPerson("Jill", "O");
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const playGame = function(index) {
        if (playCount === 0 || playCount % 2 === 0) {
            gameboard.addMark(index, player1.mark);
            console.log(gameboard.renderGameboard());
        } else if (playCount % 2 !== 0) {
            gameboard.addMark(index, player2.mark);
            console.log(gameboard.renderGameboard());
        }
        console.log(checkForWin());
    }

    function checkForWin() {
        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            board = gameboard.renderGameboard;
            if (board[a] === board[b] === board[c] && board[a] !== "") {
                return true;
            } else {
                return false;
            }
        }
    }

    return { player1, player2, playGame };
})()

console.log(displayController.playGame(0)); // x
console.log(displayController.playGame(0)); // o invalid
console.log(displayController.playGame(1)); // o
console.log(displayController.playGame(0)); // x invalid
console.log(displayController.playGame(4)); // x
