document.addEventListener("DOMContentLoaded", async function () {
  const board = document.getElementById("board");
  const guessForm = document.getElementById("guess-form");
  const guessInput = document.getElementById("guess-input");
  const usedLettersDiv = document.getElementById("used-letters");
  const restartButton = document.getElementById("restartButton");

  const letterStatus = {};
  const keyboardLayout = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  let currentRow = 0;
  let gameOver = false;

  // ✅ Get a random 5-letter word from API
  async function getData() {
    const url = "https://random-word-api.vercel.app/api?words=1&length=5";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      return result[0].toUpperCase();
    } catch (error) {
      console.error("Error fetching word:", error.message);
      alert("Failed to load a random word. Using fallback word 'APPLE'.");
      return "APPLE"; // fallback
    }
  }

  // ✅ Wait for the word before continuing
  const secretWord = await getData();
  console.log("Secret Word (for testing):", secretWord);

  // Board
  function createWordRow(rowIndex) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("word-row");

    for (let colIndex = 0; colIndex < 5; colIndex++) {
      const cell = document.createElement("div");
      cell.classList.add("letter-cell", `pos-${rowIndex}-${colIndex}`);
      rowDiv.appendChild(cell);
    }

    board.appendChild(rowDiv);
  }

  for (let row = 0; row < 6; row++) {
    createWordRow(row);
  }

  // Keyboard
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

  // Handle guesses 
  guessForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (gameOver) return;

    const guess = guessInput.value.trim().toUpperCase();

    if (guess.length !== 5) {
      alert("Please enter a 5-letter word.");
      return;
    }

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

    createUsedLetterBoard();

    if (guess === secretWord) {
      alert("🎉 Congratulations!");
      gameOver = true;
      restartButton.style.display = "inline-block";
    } else {
      currentRow++;
      if (currentRow >= 6) {
        alert(`😞 Game Over! The word was: ${secretWord}`);
        gameOver = true;
        restartButton.style.display = "inline-block";
      }
    }

    guessInput.value = "";
  });

  // Restart button
  restartButton.addEventListener("click", function () {
    location.reload();
  });
});