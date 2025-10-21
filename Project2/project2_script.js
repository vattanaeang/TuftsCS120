document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("board");
  const guessForm = document.getElementById("guess-form");
  const guessInput = document.getElementById("guess-input");
  const usedLettersDiv = document.getElementById("used-letters");
  const restartButton = document.getElementById("restartButton");

  // Word list (30+ 5-letter words)
  const wordList = [
    "apple", "brave", "cabin", "delta", "eagle", "flame",
    "giant", "habit", "index", "joker", "kneel", "lemon",
    "mango", "noble", "ocean", "piano", "queen", "robot",
    "scale", "tiger", "uncle", "vivid", "whale", "xenon",
    "youth", "zebra", "angel", "beach", "crisp", "dream",
    "event", "frost", "grape", "heart"
  ];

  // Pick a secret word at random
  const secretWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
  console.log("Secret Word (for testing):", secretWord);

  // Used to track status of each letter
  const letterStatus = {}; // e.g. {A: "present", B: "absent", C: "correct"}

  // Keyboard layout
  const keyboardLayout = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  // Create the 6-row board
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

  // Create the on-screen keyboard
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
          key.classList.add(letterStatus[letter]); // add class: 'correct', 'present', or 'absent'
        }

        key.id = `key-${letter}`;
        rowDiv.appendChild(key);
      }

      usedLettersDiv.appendChild(rowDiv);
    });
  }

  createUsedLetterBoard(); 

  // Handle guess submission
  guessForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const guess = guessInput.value.trim().toUpperCase();

    if (guess.length !== 5) {
      alert("Please enter a 5-letter word.");
      return;
    }

    // Update letter status based on guess
    for (let i = 0; i < 5; i++) {
      const letter = guess[i];

      if (secretWord[i] === letter) {
        letterStatus[letter] = "correct";
      } else if (secretWord.includes(letter)) {
        if (letterStatus[letter] !== "correct") {
          letterStatus[letter] = "present";
        }
      } else {
        if (!letterStatus[letter]) {
          letterStatus[letter] = "absent";
        }
      }
    }

    createUsedLetterBoard(); // Re-render keyboard with updated colors

    alert("You guessed: " + guess); // Temp feedback — replace later with actual board update

    guessInput.value = ""; // Clear input
  });
});