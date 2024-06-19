// DOM module

const domGameboard = (function DomGameboard() {

    const cellList = document.querySelectorAll(".cell");

// set up event listeners to get index
// push that index into the playGame function

    const clickDom = function() {
        cellList.forEach((cell) => {
            cell.addEventListener("click", (e) => {
                let index = e.target.id;
                displayController.playGame(index)
            })
        })
    }
    
    const updateDom = function(index, mark) {
        if (cellList[index].innerText === "") {
            cellList[index].innerText = mark;
        }
    }

    const resetDom = function() {
        cellList.forEach((cell) => cell.innerText = "");
    }

    return { clickDom, updateDom, resetDom };

})();

// gameboard module

const gameboard = (function Gameboard() {
    let board = ["","","","","","","","",""];

    const renderGameboard = () => board;

    const addMark = function(index, mark) {
        if (board[index] === "") {
            board[index] = mark;
            displayController.addPlayCount();
        } else {
            return;
        }
    }

    const resetBoard = () => board = ["","","","","","","","",""];

    return { renderGameboard, addMark, resetBoard };
})();

// person factory function

function createPerson(name, mark) {
    return { name, mark };
}

// displayController module

const displayController = (function displayController() {
    let playCount = 0 
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
    
    const addPlayCount = () => playCount++;

    const playGame = function(index) {
        index = parseInt(index);
        if (checkForWin()) {
            return;
        } else {
            if (gameboard.renderGameboard()[index] !== "") {
                console.log(`Invalid move. Try again.`);
            }
    
            if (playCount === 0 || playCount % 2 === 0) {
                gameboard.addMark(index, player1.mark);
                domGameboard.updateDom(index, player1.mark);
                winCheckAfterPlay();
            } else if (playCount % 2 !== 0) {
                gameboard.addMark(index, player2.mark);
                domGameboard.updateDom(index, player2.mark);
                winCheckAfterPlay();
            }
            console.log(gameboard.renderGameboard());
            console.log(playCount)
        }

    };

    function winCheckAfterPlay() {
        if (checkForWin()) {
            console.log(`Win detected`)
            return;
        } else if (playCount === 9) {
            console.log(`Tie`)
            return;
        }
    }

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

    const resetGame = function() {
        gameboard.resetBoard();
        playCount = 0;
        domGameboard.resetDom();
        console.log(`Game reset`)
    }

    return { playGame, addPlayCount, resetGame };
})()

domGameboard.clickDom();


/*
displayController.playGame(0); // x
displayController.playGame(0); // o invalid
displayController.playGame(1); // o
displayController.playGame(0); // x invalid
displayController.playGame(4); // x
displayController.playGame(5); // o
displayController.playGame(8); // x should've ended the game
displayController.playGame(2);
displayController.playGame(3);

displayController.resetGame();

displayController.playGame(0); // x
displayController.playGame(1);
displayController.playGame(3);
displayController.playGame(2);
displayController.playGame(6); // win
displayController.playGame(8); 
displayController.playGame(5); 
*/