const canvas = document.getElementById("game");
canvas.width = width;
canvas.height = height;

const renderer = PIXI.autoDetectRenderer(
  canvas.width, canvas.height, { view: canvas }, true, true
);
renderer.backgroundColor = bgColor;

const scene = new PIXI.Stage();

const game = parseMatch(match);
drawGameField(game, 29);

renderer.render(scene);

function drawGameField(game, round) {
  let entities = [];

  let currentField = new Array(9).fill(new Array(9).fill(0));

  for (let r = 0; r < round; r++) {
    currentField[game.moves[r].x][game.moves[r].y] = r % 2 == 0 ? 1 : 2;
  }

  entities.push(createTextLabel(boardLeft / 3, boardMargin, "TicTacToe", fontSize));
  entities.push(createTextLabel(
    boardLeft / 6,
    height / 10,
    game.firstPlayer + " vs " + game.secondPlayer,
    fontSize
  ));

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const fieldLeft = boardLeft + fieldMargin * calcIndent(j) + fieldWidth * j;
      const fieldTop = boardMargin + fieldMargin * calcIndent(i) + fieldHeight * i;

      const gameField = createGameField(
        fieldLeft,
        fieldTop,
        fieldWidth,
        fieldHeight,
        fieldColor,
        currentField[i][j]
      );

      const roundLeft = boardMargin + roundMargin * j + roundWidth * j;
      const roundTop = boardHeight / 1.8 + roundMargin * i + roundHeight * i;

      const roundNum = i * 9 + j + 1;
      const roundField = createRoundField(
        roundLeft,
        roundTop,
        roundWidth,
        roundHeight,
        roundNum <= game.roundsCount ? fieldColor : missingRoundColor,
        roundNum
      );

      entities.push.apply(entities, gameField);
      entities.push.apply(entities, roundField);
    }
  }

  const controls = createControls(
    controlLeft,
    controlTop,
    controlWidth,
    controlHeight,
    controlColor
  );

  entities.push.apply(entities, controls);

  for (let entity of entities) {
    if (entity != null) {
      scene.addChild(entity);
    }
  }
}



function calcIndent(c) {
  let indent = c + 1;
  if (c / 3 > 0) {
    return Math.floor(c / 3) + indent;
  }

  return indent;
}
