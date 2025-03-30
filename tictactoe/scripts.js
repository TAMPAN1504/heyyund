let selectedCells = Array(9).fill(null);
let currentPlayer = "X";
let hasWinner = false;
let isDraw = false;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const welcomeScreen = document.querySelector(".welcome");
const cells = document.getElementsByClassName("cell");
const statusBarHighlight = document.querySelector(".status_bar_highlight");
const restartBtn = document.querySelector(".restart_btn");

const hideWelcomeScreen = () => {
  setTimeout(() => {
    welcomeScreen.classList.add("welcome-slide");
  }, 2000);
  setTimeout(() => {
    welcomeScreen.classList.add("hidden");
  }, 4000);
};

const onCellClick = (clickedCell) => {
  if (!hasWinner && !isDraw) {
    const tileNumber = parseInt(clickedCell.classList[1].slice(-1));
    if (!selectedCells[tileNumber]) {
      selectedCells[tileNumber] = currentPlayer;
      clickedCell.classList.add(currentPlayer);
      clickedCell.innerHTML = currentPlayer;
      checkWinner(selectedCells);
      if (!hasWinner && !isDraw) {
        togglePlayer();
        if (currentPlayer === "O") {
          setTimeout(botMove, 500);
        }
      }
    }
  }
};

const botMove = () => {
  const emptyCells = selectedCells.map((val, index) => (val === null ? index : null)).filter(val => val !== null);

  // Try to win if possible
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    const values = [selectedCells[a], selectedCells[b], selectedCells[c]];
    if (values.filter(v => v === "O").length === 2 && values.includes(null)) {
      const winIndex = combination[values.indexOf(null)];
      makeBotMove(winIndex);
      return;
    }
  }

  // Block opponent's win
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    const values = [selectedCells[a], selectedCells[b], selectedCells[c]];
    if (values.filter(v => v === "X").length === 2 && values.includes(null)) {
      const blockIndex = combination[values.indexOf(null)];
      makeBotMove(blockIndex);
      return;
    }
  }

  // Otherwise, pick a strategic move (center > corners > random)
  if (selectedCells[4] === null) {
    makeBotMove(4); // Center
    return;
  }

  const corners = [0, 2, 6, 8].filter(index => selectedCells[index] === null);
  if (corners.length > 0) {
    makeBotMove(corners[Math.floor(Math.random() * corners.length)]);
    return;
  }

  // Default to random move
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeBotMove(randomIndex);
};

const makeBotMove = (index) => {
  selectedCells[index] = "O";
  cells[index].classList.add("O");
  cells[index].innerHTML = "O";
  checkWinner(selectedCells);
  if (!hasWinner && !isDraw) {
    togglePlayer();
  }
};

const checkWinner = (selectedCells) => {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (selectedCells[a] && selectedCells[a] === selectedCells[b] && selectedCells[a] === selectedCells[c]) {
      cells[a].classList.add("cell-win");
      cells[b].classList.add("cell-win");
      cells[c].classList.add("cell-win");
      setTimeout(() => {
        alert(`${selectedCells[a]} wins!`);
      }, 500);
      hasWinner = true;
      return;
    }
  }
  checkDraw(selectedCells);
};

const checkDraw = (selectedCells) => {
  if (selectedCells.every(cell => cell !== null) && !hasWinner) {
    setTimeout(() => {
      alert("Draw! Try again.");
    }, 500);
    isDraw = true;
  }
};

const restartGame = () => {
  restartBtn.classList.add("rotate");

  selectedCells = Array(9).fill(null);
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("X", "O", "cell-win");
    cells[i].innerHTML = "";
  }
  currentPlayer = "X";
  hasWinner = false;
  isDraw = false;

  setTimeout(() => {
    restartBtn.classList.remove("rotate");
  }, 800);

  updateStatusBar();
};

const updateStatusBar = () => {
  statusBarHighlight.innerHTML = currentPlayer;
  statusBarHighlight.classList.remove("X", "O", "win");
  statusBarHighlight.classList.add(currentPlayer);
};

const togglePlayer = () => {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatusBar();
};

hideWelcomeScreen();
updateStatusBar();

// Attach event listeners
document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", () => onCellClick(cell));
});
restartBtn.addEventListener("click", restartGame);
