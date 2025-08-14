
const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
console.log(board);
  const getBoard = () => board;
  const setCell = (index, marker) => {
    if (index >= 0 && index <= 8) {
      if(board[index] === "") {
        board[index] = marker;
      } else {
      return "Cell Taken!"
      }
    }

  }

  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];

  };

  return {getBoard, setCell, reset};
})();



const Player = (name, marker) => {
  return {name, marker}
};



const GameController = (() => {
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
  let currentPlayer = player1;

  const winCombos = [
    [0, 1, 2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  const playTurn = (index) => {
    Gameboard.setCell(index, currentPlayer.marker)
    if (checkWin()) {
      console.log(`${currentPlayer.name} wins!`);
      return;
    }
    switchPlayer();
    };

    const switchPlayer = () => {
      currentPlayer = (currentPlayer === player1 ? player2 : player1);

    }

    const checkWin = () => {
    const board = Gameboard.getBoard();
    return winCombos.some(combo => 
      combo.every(index => board[index] === currentPlayer.marker)
    );

  };
    return {playTurn};
})();

GameController.playTurn(0); // X
GameController.playTurn(3); // O
GameController.playTurn(1); // X
GameController.playTurn(4); // O
GameController.playTurn(2); // X 