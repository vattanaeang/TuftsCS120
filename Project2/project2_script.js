document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("board");
  const guessForm = document.getElementById("guess-form");
  const guessInput = document.getElementById("guess-input");
  const usedLettersDiv = document.getElementById("used-letters");
  const restartButton = document.getElementById("restartButton");

  // Word list
  const wordList = [
    "apple", "brave", "cabin", "delta", "eagle", "flame",
    "giant", "habit", "index", "joker", "kneel", "lemon",
    "mango", "noble", "ocean", "piano", "queen", "robot",
    "scale", "tiger", "uncle", "vivid", "whale", "xenon",
    "youth", "zebra", "angel", "beach", "crisp", "dream",
    "event", "frost", "grape", "heart"
  ];

  const secretWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
  console.log("Secret Word (for testing):", secretWord);

  const letterStatus = {}; // e.g. {A: "present", B: "absent", C: "correct"}
  const keyboardLayout = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  let currentRow = 0;
  let gameOver = false;

  // Build board
  function createWordRow(rowIndex) {
  const rowDiv = document.createElement("div");
  rowDiv.classList.add("word-row");

  // Arrow function to create a cell
  const createCell = (row, col) => {
    const cell = document.createElement("div");
    cell.classList.add("letter-cell", `pos-${row}-${col}`);
    return cell;
  };

  for (let colIndex = 0; colIndex < 5; colIndex++) {
    const cell = createCell(rowIndex, colIndex);
    rowDiv.appendChild(cell);
  }

  board.appendChild(rowDiv);
}

  for (let row = 0; row < 6; row++) {
    createWordRow(row);
  }

  // Build on-screen keyboard
  function createUsedLetterBoard() {
    usedLettersDiv.innerHTML = "";

    keyboardLayout.forEach(row => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("keyboard-row");

      for (const letter of row) {
        const key = document.createElement("div");
        key.classList.add("key");
        key.textContent = letter;

        if (letterStatus[letter]) {
          key.classList.add(letterStatus[letter]);
        }

        key.id = `key-${letter}`;
        rowDiv.appendChild(key);
      }

      usedLettersDiv.appendChild(rowDiv);
    });
  }

  createUsedLetterBoard();

  // Handle guess submissions
  guessForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (gameOver) return;

    const guess = guessInput.value.trim().toUpperCase();

    if (guess.length !== 5) {
      alert("Please enter a 5-letter word.");
      return;
    }

    // Display letters in the current row
    for (let i = 0; i < 5; i++) {
      const cell = document.querySelector(`.pos-${currentRow}-${i}`);
      cell.textContent = guess[i];

      if (secretWord[i] === guess[i]) {
        cell.classList.add("correct");
        letterStatus[guess[i]] = "correct";
      } else if (secretWord.includes(guess[i])) {
        cell.classList.add("present");
        if (letterStatus[guess[i]] !== "correct") {
          letterStatus[guess[i]] = "present";
        }
      } else {
        cell.classList.add("absent");
        if (!letterStatus[guess[i]]) {
          letterStatus[guess[i]] = "absent";
        }
      }
    }

    createUsedLetterBoard(); // Update keyboard colors

    if (guess === secretWord) {
      alert("Congratulations");
      gameOver = true;
      restartButton.style.display = "inline-block";
    } else {
      currentRow++;
      if (currentRow >= 6) {
        alert(`Game Over! The word was: ${secretWord}`);
        gameOver = true;
        restartButton.style.display = "inline-block";
      }
    }

    guessInput.value = ""; // Clear input box
  });

  // Restart button logic
  restartButton.addEventListener("click", function () {
    location.reload(); // Reload page to restart
  });
});