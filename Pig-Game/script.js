// const secureBooking = function () {
//   let passCount = 0;

//   return function () {
//     passCount++;
//     console.log(passCount);
//   };
// };

// const booker = secureBooking();
// booker();

// (function () {
//   const header = document.querySelector("h1");
//   header.style.color = "blue";
//   let i = 0;
//   document.body.addEventListener("click", function () {
//     if (i % 2 == 0) header.style.color = "red";
//     else header.style.color = "blue";
//     i++;
//   });
// })();

const hold = document.querySelector(".hold");
const rolldice = document.querySelector(".rollDice");
const newGame = document.querySelector(".new_game");
const activeChange = document.querySelectorAll("[class*=active]");
const resetScore = document.querySelectorAll("[class*=score]");

// let currentPlayer = 1;

// const playerCurScore = document.querySelector(
//   `.player${currentPlayer}_currentScore-score`
// );
// const playerScore = document.querySelector(`.player${currentPlayer}_score`);

// const switchPlayer = () => {
//   playerCurScore.textContent = 0;
//   activeChange.forEach((actply) => {
//     const check = actply.classList.toggle("hidden");
//     if (!check) {
//       currentPlayer = +actply.dataset.id;
//     }
//   });
//   console.log(currentPlayer, "afterSwitch");
// };

// const reset = () => {
//   resetScore.forEach((score) => (score.textContent = 0));
//   document.querySelector(".player1-active").classList.remove("hidden");
//   document.querySelector(".player2-active").classList.add("hidden");
//   document.querySelector(".DiceScreen").textContent = "";
// };

// const AddScore = () => {
//   playerScore.textContent =
//     +playerScore.textContent + +playerCurScore.textContent;
// };

// const randomINt = (min, max) => {
//   return Math.trunc(Math.random() * (max - min) + 1) + min;
// };

// rolldice.addEventListener("click", function () {
//   const diceValue = randomINt(0, 6);
//   document.querySelector(".DiceScreen").textContent = diceValue;
//   if (diceValue !== 1) {
//     playerCurScore.textContent = diceValue + +playerCurScore.textContent;
//   } else {
//     AddScore();
//     switchPlayer();
//   }
// });

class pigGame {
  currentPlayer;
  #playerScore;
  #playerCurScore;
  constructor(curply) {
    this.currentPlayer = curply;
    this.#setCurrentPlayer();
  }

  #setCurrentPlayer() {
    this.#playerCurScore = document.querySelector(
      `.player${this.currentPlayer}_currentScore-score`
    );
    this.#playerScore = document.querySelector(
      `.player${this.currentPlayer}_score`
    );
  }

  #randNum(min, max) {
    return Math.trunc(Math.random() * (max - min) + 1) + min;
  }

  #switch() {
    this.#playerCurScore.textContent = 0;
    activeChange.forEach((actply) => {
      const check = actply.classList.toggle("hidden");
      if (!check) {
        this.currentPlayer = +actply.dataset.id;
      }
    });
    document.querySelector(".DiceScreen").textContent = 0;
  }
  #reset() {
    resetScore.forEach((score) => (score.textContent = 0));
    document.querySelector(".player1-active").classList.remove("hidden");
    document.querySelector(".player2-active").classList.add("hidden");
    document.querySelector(".DiceScreen").textContent = "";
  }
  #addscore() {
    this.#playerScore.textContent =
      +this.#playerScore.textContent + +this.#playerCurScore.textContent;
  }

  newGame() {
    this.#reset();
  }
  #winnercheck() {
    if (+this.#playerScore.textContent >= 100) {
      alert(`Player${this.currentPlayer} Wins`);

      return 0;
    }
    return 1;
  }
  #isWinner() {
    const isWinner = this.#winnercheck();
    if (isWinner === 1) {
      this.#switch();
      this.#setCurrentPlayer();
    } else {
      this.#reset();
    }
  }
  hold() {
    this.#addscore();
    this.#isWinner();
  }
  rolldice() {
    const Value = this.#randNum(0, 6);
    document.querySelector(".DiceScreen").textContent = Value;
    if (Value !== 1) {
      this.#playerCurScore.textContent =
        Value + +this.#playerCurScore.textContent;
    } else {
      this.#addscore();
      this.#isWinner();
    }
  }
}

const Game = new pigGame(1);

newGame.addEventListener("click", Game.newGame.bind(Game));
hold.addEventListener("click", Game.hold.bind(Game));
rolldice.addEventListener("click", Game.rolldice.bind(Game));
