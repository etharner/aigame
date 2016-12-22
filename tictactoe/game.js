//out.js format
//const match = `
//[player 1 name]
//[player 2 name]
//[rounds count]
//[list of [x y] moves each on new line]
//[winner name]
//`

class Game {
  constructor(firstPlayer, secondPlayer, roundsCount, moves, winner) {
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.roundsCount = roundsCount;
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

  let moves = [];
  for (let i = 0; i < roundsCount; i++) {
    moves.push(new Move(lines[3 + i]));
  }

  const winner = lines[3 + roundsCount];

  return new Game(firstPlayer, secondPlayer, roundsCount, moves, winner);
}
