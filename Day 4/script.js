class Game {
  constructor() {
    this.board = Array(9).fill("");
    this.currentPlayer = "X";
    this.gameOver = false;
    this.loadLeaderboard();
    this.render();
  }

  // Arrow function for move
  makeMove = (index) => {
    if (this.board[index] !== "" || this.gameOver) return;

    this.board[index] = this.currentPlayer;
    this.render();

    if (this.checkWinner()) {
      document.getElementById("status").innerText =
        `${this.currentPlayer} Wins!`;
      this.saveScore(this.currentPlayer);
      this.gameOver = true;
      return;
    }

    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
  };

  // reduce used for win detection
  checkWinner() {
    const wins = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    return wins.reduce((win, combo) => {
      const [a, b, c] = combo;
      return win ||
        (this.board[a] &&
         this.board[a] === this.board[b] &&
         this.board[a] === this.board[c]);
    }, false);
  }

  render() {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";

    this.board.forEach((value, index) => {
      const cell = document.createElement("button");
      cell.className = "cell";
      cell.innerText = value;
      cell.onclick = () => this.makeMove(index);
      boardDiv.appendChild(cell);
    });
  }

  reset() {
    this.board = Array(9).fill("");
    this.currentPlayer = "X";
    this.gameOver = false;
    document.getElementById("status").innerText = "";
    this.render();
  }

  // localStorage for leaderboard
  saveScore(player) {
    this.scores[player] = (this.scores[player] || 0) + 1;
    localStorage.setItem("scores", JSON.stringify(this.scores));
    this.loadLeaderboard();
  }

  loadLeaderboard() {
    this.scores = JSON.parse(localStorage.getItem("scores")) || {};
    const list = document.getElementById("leaderboard");
    list.innerHTML = "";

    Object.keys(this.scores).forEach(player => {
      const li = document.createElement("li");
      li.innerText = `${player} : ${this.scores[player]} wins`;
      list.appendChild(li);
    });
  }
}

const game = new Game();