const canvas = document.getElementById("game");
canvas.width = width;
canvas.height = height;

const renderer = PIXI.autoDetectRenderer(
  canvas.width, canvas.height, {view: canvas}
);
renderer.backgroundColor = backgroundColor;

const scene = new PIXI.Container();

const game = "";

drawGameField(game);

renderer.render(scene);

function drawGameField(game) {
  scene.addChild(createRect(
    boardLeft,
    boardMargin,
    boardWidth,
    boardHeight,
    boardBorderWidth,
    boardBorderColor
  ));

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      scene.addChild(createRect(
        boardLeft + fieldMargin * calcIndent(j) + fieldWidth * j,
        boardMargin + fieldMargin * calcIndent(i) + fieldHeight * i,
        fieldWidth,
        fieldHeight,
        1,
        boardBorderColor
      ));
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
