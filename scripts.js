// gameboard module

const gameboard = (function Gameboard() {
    const board = ["","","","","","","","",""];

    const renderGameboard = () => board;

    const addMark = function(index, mark) {
        if (board[index] === "") {
            board[index] = mark;
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

    const playGame = function(index) {
        if (playCount === 0 || playCount % 2 === 0) {
            gameboard.addMark(index, player1.mark);
            playCount++;
            console.log(gameboard.renderGameboard());
        } else if (playCount % 2 !== 0) {
            gameboard.addMark(index, player2.mark);
            playCount++;
            console.log(gameboard.renderGameboard());
        }
    }

    return { player1, player2, playGame };
})()

console.log(gameboard.renderGameboard());
console.log(displayController.playGame(1));
console.log(displayController.playGame(2));
console.log(displayController.playGame(0));
console.log(displayController.playGame(0));