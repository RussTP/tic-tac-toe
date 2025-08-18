
const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  const setCell = (index, marker) => {
    if (index >= 0 && index <= 8) {
      if(board[index] === "") {
        board[index] = marker;
      } else {
        board[index].marker.disabled = true;
      }
    };

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

    const setPlayerNames = (name1, name2) => {
     if (name1) player1.name = name1;
     if (name2) player2.name = name2;
       displayController.setResult();
    };



      const getPlayerNames = () => {
    return {
      player1: player1.name,
      player2: player2.name
    };
  };



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

        const resetScore = () => {
      player1Score = 0;
      player2Score = 0;
    }


  const playTurn = (index) => {
    const board = Gameboard.getBoard();
    Gameboard.setCell(index, currentPlayer.marker)
    
    if (checkWin()) {
      addWin();
      displayController.disableCells();
      console.log(`${currentPlayer.name} wins!`);
      return {win: true, player: currentPlayer};
    } 

    if (board.every(cell => cell !== "")) {
      displayController.setMessage("It's a tie!");
      displayController.disableCells();
      return;
    }


    switchPlayer();
    return {win: false, player: currentPlayer};
    };

    const switchPlayer = () => {
      currentPlayer = (currentPlayer === player1 ? player2 : player1);

    }
  


      const resetButton = document.querySelector("#reset-button");
      resetButton.addEventListener("click", () => {
        Gameboard.reset();
        displayController.updateBoard();
        displayController.setMessage("");
        displayController.enableCells();
        displayController.resetCellStyle();
      });
    

    const checkWin = () => {
    const board = Gameboard.getBoard();
    return winCombos.some(combo => 
      combo.every(index => board[index] === currentPlayer.marker)
    );
  };


    return {playTurn, checkWin, getCurrentPlayer, getScore, setPlayerNames, getPlayerNames, resetScore};
})();



const displayController = (() => {
  const cells = document.querySelectorAll(".cell");
  const message = document.querySelector("#message");
  const player1Name = document.querySelector("#player1-name");
  const player2Name = document.querySelector("#player2-name");
  const submit = document.querySelector('input[type="submit"]');
  const startButton = document.querySelector("#start-button");
  const newGameButton = document.querySelector("#new-game-button");
  const getForm = document.querySelector("#player-form");
  const board = document.querySelector("#board");

  const updateBoard = () => {
    const displayBoard = Gameboard.getBoard();
    displayBoard.forEach((mark, index) => {
      cells[index].textContent = mark;

    });

  };
  
  const setPlayerName = () => {
    submit.addEventListener("click", (event) => {
      event.preventDefault();
      const name1 = player1Name.value.trim();
      const name2 = player2Name.value.trim();
      getForm.classList.remove("active");
       board.classList.add("active");
       startButton.style.display = "none";
       newGameButton.classList.add("active");
       setResult();


      if (name1 || name2) {
        GameController.setPlayerNames(name1, name2);
        setMessage(`${GameController.getCurrentPlayer().name}'s turn`);
      }
    });
  };


  const start = () => {
    startButton.addEventListener("click", () => { 
  getForm.classList.add("active");
  getForm.style.border ="4px solid rgb(13, 5, 88, 0.700)";
  getForm.style.borderRadius = "5px"
  getForm.style.boxShadow = "0 0 4px 3px rgb(255, 127, 80, 0.500)";
  getForm.style.padding="20px";
    });

    
  };

  const newGame = () => {
    newGameButton.addEventListener("click", () => {
      getForm.classList.add("active");
      
      document.querySelector("#player1-name").value = "";
      document.querySelector("#player2-name").value = "";
      
      GameController.resetScore();
      Gameboard.reset();
      setResult("");
      updateBoard();
      setMessage("");
      enableCells();
      resetCellStyle();
    });
  };


  const setMessage = (msg) => {
    message.textContent = msg;

    }
  


      const disableCells = () => {
  cells.forEach(cell => {
    cell.style.pointerEvents = "none";
    });
  };

  const enableCells = () => {
    cells.forEach(cell => {
      cell.style.pointerEvents = "auto";
    });
  };

  const resetCellStyle = () => {
    cells.forEach(cell => {
      cell.style.transform ="scale(1) rotate(0deg)";
    });
  };

  const setResult = () => {
    const score = GameController.getScore();
    const names = GameController.getPlayerNames(); 
    
    const resultDisplay = document.querySelector("#results");
    resultDisplay.textContent = (`${names.player1}: ${score.player1} | ${names.player2}: ${score.player2}`);
    resultDisplay.style.border ="4px solid rgb(13, 5, 88, 0.700)";
    resultDisplay.style.borderRadius = "5px"
    resultDisplay.style.boxShadow = "0 0 4px 3px rgb(255, 127, 80, 0.500)";
  };


  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      const result = GameController.playTurn(index);
      cell.style.transform = "scale(1.08) rotate(360deg)";
      updateBoard();

      if (result.win) {
        setMessage(`${result.player.name} Wins!`);
        setResult();
      } else {
        setMessage(`Player ${result.player.name}'s turn`);
      }
    });
  });


    return {updateBoard, setMessage, setResult, disableCells, enableCells, setPlayerName, start, resetCellStyle, newGame}
})();

displayController.setPlayerName();
displayController.start();
displayController.newGame();
