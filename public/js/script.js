const X_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/x.png';
const O_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/circle.png';

let isGameEnded = false;
const freeBoxes = Array.from(document.querySelectorAll('#grid div'));
const takenBoxes = {};

freeBoxes.forEach(box => {
  box.addEventListener('click', changeToX);
});

function assignSpace(space, owner) {
  if (isGameEnded) return;

  const image = document.createElement('img');
  image.src = owner === 'x' ? X_IMAGE_URL : O_IMAGE_URL;
  space.appendChild(image);

  const index = parseInt(space.dataset.index);
  takenBoxes[index] = owner;
  const indexToRemove = freeBoxes.indexOf(space);
  freeBoxes.splice(indexToRemove, 1);
  space.removeEventListener('click', changeToX);

  if (isGameOver()) {
    setTimeout(displayWinner, 100); 
  } else if (owner === 'x') {
    setTimeout(computerChooseO, 100); 
  }
}

function changeToX(event) {
  assignSpace(event.currentTarget, 'x');
}

function computerChooseO() {
  if (isGameEnded || freeBoxes.length === 0) return;

  let move = findBestMove('o');
  if (move === null) {
    move = findBestMove('x');
  }
  if (move === null) {
    const index = Math.floor(Math.random() * freeBoxes.length);
    move = freeBoxes[index];
  }

  assignSpace(move, 'o');
}

function findBestMove(player) {
  for (let i = 0; i < freeBoxes.length; i++) {
    const space = freeBoxes[i];
    const index = parseInt(space.dataset.index);
    takenBoxes[index] = player;
    
    if (getWinner() === player) {
      delete takenBoxes[index];
      return space;
    }
    
    delete takenBoxes[index];
  }
  return null;
}

function isGameOver() {
  return getWinner() !== null || freeBoxes.length === 0;
}

function displayWinner() {
  if (isGameEnded) return;

  isGameEnded = true;
  const winner = getWinner();

  let message = 'It\'s a tie!';
  if (winner === 'x') {
    message = 'You win!';
  } else if (winner === 'o') {
    message = 'Computer wins!';
  }

  alert(message);
}

function checkBoxes(one, two, three) {
  if (takenBoxes[one] && takenBoxes[one] === takenBoxes[two] && takenBoxes[two] === takenBoxes[three]) {
    return takenBoxes[one];
  }
  return null;
}

function getWinner() {
  const winningLines = [
    [0, 1, 2], [1, 2, 3],
    [4, 5, 6], [5, 6, 7],
    [8, 9, 10], [9, 10, 11],
    [12, 13, 14], [13, 14, 15],
    [0, 4, 8], [4, 8, 12],
    [1, 5, 9], [5, 9, 13],
    [2, 6, 10], [6, 10, 14],
    [3, 7, 11], [7, 11, 15],
    [0, 5, 10], [1, 6, 11],
    [4, 9, 14], [3, 6, 9],
    [2, 5, 8], [7, 10, 13]
  ];

  for (const line of winningLines) {
    const [a, b, c] = line;
    if (takenBoxes[a] && takenBoxes[a] === takenBoxes[b] && takenBoxes[a] === takenBoxes[c]) {
      return takenBoxes[a]; 
    }
  }
  return null;
}

  