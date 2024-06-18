// gameboard module

const gameboard = (function Gameboard() {
    const gameboard = [];

    const renderGameboard = () => gameboard;

    return { renderGameboard };
})();

// person factory function

function createPerson(name, mark) {
    return { name, mark };
}

// displayController module

const displayController = (function displayController() {
    const player1 = createPerson("Jack", "X");
    const player2 = createPerson("Jill", "O");


    return { player1, player2 };
})()

console.log(gameboard.renderGameboard());
console.log(displayController.player1);
