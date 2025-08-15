
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

  let player1Score = 0;
  let player2Score = 0;


  const getCurrentPlayer = () => currentPlayer;

  const winCombos = [
    [0, 1, 2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];


      const addWin = () => {
      if (currentPlayer === player1) {
        player1Score++;
      } else {
        player2Score++;
      }
    }

    getScore = () =>({
      player1: player1Score, 
      player2: player2Score
    });


  const playTurn = (index) => {
    Gameboard.setCell(index, currentPlayer.marker)
    if (checkWin()) {
      addWin();
      console.log(`${currentPlayer.name} wins!`);
      return;
    }
    switchPlayer();
    };

    const switchPlayer = () => {
      currentPlayer = (currentPlayer === player1 ? player2 : player1);

    }



      const resetButton = document.querySelector("#reset-button");
      resetButton.addEventListener("click", () => {
        Gameboard.reset();
        displayController.updateBoard();
        displayController.setMessage(`${GameController.getCurrentPlayer().name}`)
      })
    

    const checkWin = () => {
    const board = Gameboard.getBoard();
    return winCombos.some(combo => 
      combo.every(index => board[index] === currentPlayer.marker)
    );

  };
    return {playTurn, checkWin, getCurrentPlayer, getScore};
})();



const displayController = (() => {
  const cells = document.querySelectorAll(".cell");
  const message = document.querySelector("#message");
  const results = document.querySelector("#results")
  

  const updateBoard = () => {
    const displayBoard = Gameboard.getBoard();
    displayBoard.forEach((mark, index) => {
      cells[index].textContent = mark;

    });

  };

  const setMessage = (msg) => {
    message.textContent = msg;

    }
  
  const setResult = (msg) => {
      results.textContent = msg;
  }

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      GameController.playTurn(index);
      updateBoard();

      if (GameController.checkWin()) {
        setMessage(`${GameController.getCurrentPlayer().name} Wins!`);

        const score = GameController.getScore();
        setResult(`P1: ${score.player1} | P2: ${score.player2}`);
      } else {
        setMessage(`Player ${GameController.getCurrentPlayer().name}'s turn`);
      }
    });
  });

    return {updateBoard, setMessage, setResult}
})();