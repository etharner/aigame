//out.js format
//const match = `
//[player 1 name]
//[player 2 name]
//[rounds count]
//[list of [x y] moves each on new line]
//[winner name]
//`

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
    this.x = parseInt(stringMove[1]);
    this.y = parseInt(stringMove[3]);
  }
}

function parseMatch(match) {
  const lines = match.split("\n").slice(1, -1);
  const firstPlayer = lines[0];
  const secondPlayer = lines[1];
  const roundsCount = parseInt(lines[2]);

  fields = new Array(roundsCount + 1);
  fields[0] = new Array(9).fill(new Array(9).fill(0));
  moves = new Array(roundsCount + 1);
  moves[0] = new Move(0, 0);

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
