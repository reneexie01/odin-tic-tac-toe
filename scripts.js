// DOM module

const domGameboard = (function DomGameboard() {

    const cellList = document.querySelectorAll(".cell");

    const clickDom = function() {
        
        cellList.forEach((cell) => {
            cell.addEventListener("click", (e) => {
                let index = e.target.id;
                displayController.playGame(index);
                updatePlayCount();
                playerTurnAnnouncement();
                winningBoardAnnouncement()
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

    const playerNameSubmissions = function() {
        const submitButton = document.querySelector(".submit");

        submitButton.addEventListener("click", () => {
            event.preventDefault();

            const player1Name = document.querySelector("#player1").value;
            const player2Name = document.querySelector("#player2").value;

            if (player1Name === "" || player2Name === "") {
                console.log(`Please add a name for both player1 and player2`)
            } else {
                displayController.setPlayerNames(player1Name, player2Name);
                displayController.getGameStatus = true;
                playerNameAnnouncements(player1Name, player2Name);
            }
        })
    }

    function updatePlayCount() {
        const playCountAnnouncementPara = document.querySelector(".play-count");
        playCountAnnouncementPara.innerText = `Play Count: ${displayController.getPlayCount()}`

    }

    function playerNameAnnouncements(name1, name2) {
        const gameAnnouncements = document.querySelector(".game-announcements");
        gameAnnouncements.innerText = "";

        const playerAnnouncementPara = document.createElement("p");
        playerAnnouncementPara.classList.add("player-announcement")
        const playerInputs = document.createTextNode(`Current Game: ${name1} VS ${name2}`);
        playerAnnouncementPara.appendChild(playerInputs);
        gameAnnouncements.appendChild(playerAnnouncementPara);
        playerCountAnnouncement();
        playerTurnAnnouncement();
    }

    function playerCountAnnouncement() {
        const playerAnnouncementPara = document.querySelector(".player-announcement");

        const playCountAnnouncementPara = document.createElement("p");
        playCountAnnouncementPara.classList.add("play-count");
        
        const playCount = document.createTextNode(`Play Count: 0`);
        playCountAnnouncementPara.appendChild(playCount);
        playerAnnouncementPara.appendChild(playCountAnnouncementPara);
    }

    function playerTurnAnnouncement() {
        const playCountAnnouncementPara = document.querySelector(".play-count");
        
        const playerTurnPara = document.createElement("p");
        playerTurnPara.classList.add("player-turn");

        let currentPlayCount = displayController.getPlayCount();

        if (currentPlayCount === 0 || currentPlayCount % 2 === 0) {
            const player1Turn = document.createTextNode(`Player 1's turn.`)
            playerTurnPara.appendChild(player1Turn);
            playCountAnnouncementPara.appendChild(playerTurnPara);
        } else if (currentPlayCount % 2 !== 0) {
            const player2Turn = document.createTextNode(`Player 2's turn.`)
            playerTurnPara.appendChild(player2Turn);
            playCountAnnouncementPara.appendChild(playerTurnPara);
        }
    }

    function winningBoardAnnouncement() {
        const playerTurnPara = document.querySelector(".player-turn");
        const playCountAnnouncementPara = document.querySelector(".play-count");

        if (displayController.winningBoardStatus() === true) {
            playerTurnPara.remove();
            const winningAnnouncementPara = document.createElement("p");
            winningAnnouncementPara.classList.add("winning-announcement");

            const winningAnnouncement = document.createTextNode(`Winner detected`);
            winningAnnouncementPara.appendChild(winningAnnouncement);
            playCountAnnouncementPara.appendChild(winningAnnouncementPara);
        } else {
            return;
        }
    }

    return { clickDom, updateDom, resetDom, playerNameSubmissions };

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
    let player1 = createPerson("Player 1", "X");
    let player2 = createPerson("Player 2", "O");
    let winningBoard = false;

    const setPlayerNames = function(name1, name2) {
        player1.name = name1;
        player2.name = name2;
    }

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

    const getPlayCount = () => playCount;

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
            // console.log(gameboard.renderGameboard());
            // console.log(playCount)
        }

    };

    const winningBoardStatus = () => winningBoard;

    function winCheckAfterPlay() {
        if (checkForWin()) {
            console.log(`Win detected`)
            winningBoard = true;
        } else if (playCount === 9) {
            console.log(`Tie`)
            winningBoard = false;
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

    return { setPlayerNames, playGame, addPlayCount, getPlayCount, resetGame, winningBoardStatus };
})()

domGameboard.clickDom();
domGameboard.playerNameSubmissions();


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