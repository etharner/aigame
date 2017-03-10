class Game {
  constructor(firstPlayer, secondPlayer, roundsCount, fields, moves, winner) {
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.roundsCount = roundsCount;
    this.fields = fields;
    this.moves = moves;
    this.winner = winner;
  }
}

class Move {
  constructor(stringMove) {
    let x = parseInt(stringMove[1]);
    let y = parseInt(stringMove[3]);

    const places = [
        [0, 1, 2, 9, 10, 11, 18, 19, 20],
        [3, 4, 5, 12, 13, 14, 21, 22, 23],
        [6, 7, 8, 15, 16, 17, 24, 25, 26],
        [27, 28, 29, 36, 37, 38, 45, 46, 47],
        [30, 31, 32, 39, 40, 41, 48, 49, 50],
        [33, 34, 35, 42, 43, 44, 51, 52, 53],
        [54, 55, 56, 63, 64, 65, 72, 73, 74],
        [57, 58, 59, 66, 67, 68, 75, 76, 77],
        [60, 61, 62, 69, 70, 71, 78, 79, 80]
    ]

    const squareNum = places[x][y];

    this.x = parseInt(squareNum / 9);
    this.y = parseInt(squareNum - this.x * 9);
  }
}


function readTextFile(file) {
  var req = new XMLHttpRequest();

  var game = this;
  req.addEventListener('load', function() {
      game.match = this.responseText;
  }, false);

  req.open("GET", file, false);
  req.send();
}

function parseMatch(matchFile) {
  readTextFile(matchFile);
  const lines = this.match.split("\n");
  const firstPlayer = lines[0];
  const secondPlayer = lines[1];
  const roundsCount = parseInt(lines[2]);

  fields = new Array(roundsCount + 1);
  fields[0] = new Array(9).fill(new Array(9).fill(0));
  moves = new Array(roundsCount + 1);
  moves[0] = new Move("[0, 0]");

  for (let r = 1; r <= roundsCount; r++) {
    const move = new Move(lines[3 + r - 1]);
    const player = r % 2 == 1 ? 1 : 2;

    let currentField = new Array(9);
    for (let i = 0; i < 9; i++) {
      currentField[i] = new Array(9);
      for (let j = 0; j < 9; j++) {
        currentField[i][j] = this.fields[r - 1][i][j];
      }
    }
    currentField[move.x][move.y] = player;

    fields[r] = currentField;
    moves[r] = move;
  }

  const winner = lines[3 + roundsCount];

  return new Game(firstPlayer, secondPlayer, roundsCount, fields, moves, winner);
}
