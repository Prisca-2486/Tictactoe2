//getting access to each and every boxes created in html document.gettig reference.


const gameboard = document.getElementById("gameboard");

const boxes = Array.from(document.getElementsByClassName("box"));

const restartBtn = document.getElementById("restartBtn");

const playText = document.getElementById("playText");
//keeping track of what is in the boxes? because if something is in the box
//not allowing users  to click on the box.:---->an array with nine itmes.
const spaces = [null, null, null, null, null, null, null, null, null];

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = O_TEXT; //checking which player's turn it actually is?

const drawBoard = () => {
  boxes.forEach((box, index) => {
    let styleString = ""; //building borders:
    if (index < 3) {
      styleString += `border-bottom: 3px solid var(--purple);`;
    }
    if (index % 3 === 0) {
      styleString += `border-right: 3px solid var(--purple);`;
    }
    if (index % 3 === 2) {
      styleString += `border-left: 3px solid var(--purple);`;
    }
    if (index > 5) {
      styleString += `border-top: 3px solid var(--purple);`;
    }
    box.style = styleString;
//setting listener to each and every boxes.
    box.addEventListener("click", boxClicked);
  });
};

function boxClicked(e) {
  const id = e.target.id; //if some users click, .... first we need to give the id of that element.
  if (!spaces[id]) { //if nothing is in the box, 
    spaces[id] = currentPlayer; //update spaces, the index id and set that with a current player.
    e.target.innerText = currentPlayer;
    if (hasPlayerWon(currentPlayer)) {
      playText.innerHTML = `${currentPlayer} wins!!`;
      return;
    }
    currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
  }
}

const hasPlayerWon = (player) => {
  //from top left, check across, down, and diagonal
  if (spaces[0] === player) {
    if (spaces[1] === player && spaces[2] === player) {
      console.log(`${player} wins up top`);
      return true;
    }
    if (spaces[3] === player && spaces[6] === player) {
      console.log(`${player} wins on the left`);
      return true;
    }
    if (spaces[4] === player && spaces[8] === player) {
      console.log(`${player} wins on the diagonal`);
      return true;
    }
  }
  //from bottom check up and across
  if (spaces[8] === player) {
    if (spaces[2] === player && spaces[5] === player) {
      console.log(`${player} wins on the right`);
      return true;
    }
    if (spaces[7] === player && spaces[6] === player) {
      console.log(`${player} wins on the bottom`);
      return true;
    }
  }
  //from middle check middle vertical and middle horizontal
  if (spaces[4] === player) {
    if (spaces[3] === player && spaces[5] === player) {
      console.log(`${player} wins on the middle horizontal`);
      return true;
    }
    if (spaces[1] === player && spaces[7] === player) {
      console.log(`${player} wins on the middle vertical`);
      return true;
    }
  }
};

restartBtn.addEventListener("click", () => {
  spaces.forEach((space, index) => {
    spaces[index] = null;
  });
  boxes.forEach((box) => {
    box.innerText = "";
  });
  playText.innerHTML = `Let's Play!!`;

  currentPlayer = O_TEXT;
});

drawBoard();
