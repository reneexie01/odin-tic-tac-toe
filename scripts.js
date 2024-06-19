// gameboard module

const gameboard = (function Gameboard() {
    const board = ["","","","","","","","",""];

    const renderGameboard = () => board;

    const addMark = function(index, mark) {
        if (board[index] === "") {
            board[index] = mark;
            playCount++;
        } else {
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
        [2, 4, 6],
        [1, 4, 6]
    ];
    
    const playGame = function(index) {

        if (gameboard.renderGameboard()[index] !== "") {
            console.log(`Invalid move. Try again.`);
        }

        if (playCount === 0 || playCount % 2 === 0) {
            gameboard.addMark(index, player1.mark);
        } else if (playCount % 2 !== 0) {
            gameboard.addMark(index, player2.mark);
        }
        
        console.log(gameboard.renderGameboard());
        console.log(playCount)
        
        if (checkForWin()){
            console.log(`Win detected`)
        } else if (playCount === 9) {
            console.log(`Tie`)
        } else {
            console.log(`Keep playing`)
        }
    };

    function checkForWin() {
        const board = gameboard.renderGameboard();
        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    }

    return { playGame };
})()

displayController.playGame(0); // x
displayController.playGame(0); // o invalid
displayController.playGame(1); // o
displayController.playGame(0); // x invalid
displayController.playGame(4); // x
displayController.playGame(5); // o
displayController.playGame(8); // x should've ended the game
displayController.playGame(2); // o