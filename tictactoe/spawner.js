function createGame(engine) {
  let currentField = new Array(9).fill(new Array(9).fill(0));

  for (let r = 0; r < engine.currentRound; r++) {
    currentField[engine.game.moves[r].x][engine.game.moves[r].y] = r % 2 == 0 ? 1 : 2;
  }

  engine.entities[engine.registrator.generateStaticName()] =
  createTextLabel(engine, boardLeft / 3, boardMargin, "TicTacToe", fontSize);
  engine.entities[engine.registrator.generateStaticName()] =
  createTextLabel(
    engine,
    boardLeft / 6,
    height / 10,
    engine.game.firstPlayer + " vs " + engine.game.secondPlayer,
    fontSize
  );

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const fieldLeft = boardLeft + fieldMargin * calcIndent(j) + fieldWidth * j;
      const fieldTop = boardMargin + fieldMargin * calcIndent(i) + fieldHeight * i;

      const gameField = createGameField(
        engine,
        fieldLeft,
        fieldTop,
        fieldWidth,
        fieldHeight,
        fieldColor,
        currentField[i][j],
         i * 9 + j
      );

      const roundLeft = boardMargin + roundMargin * j + roundWidth * j;
      const roundTop = boardHeight / 1.8 + roundMargin * i + roundHeight * i;

      const roundNum = i * 9 + j + 1;
      const roundField = createRoundField(
        engine,
        roundLeft,
        roundTop,
        roundWidth,
        roundHeight,
        roundNum <= engine.game.roundsCount ? fieldColor : missingRoundColor,
        roundNum
      );
    }
  }

  const controls = createControls(
    engine,
    controlLeft,
    controlTop,
    controlWidth,
    controlHeight,
    controlColor
  );

  for (let entity of Object.values(engine.entities)) {
    engine.scene.addChild(entity);
  }
}

function calcIndent(c) {
  let indent = c + 1;
  if (c / 3 > 0) {
    return Math.floor(c / 3) + indent;
  }

  return indent;
}

function createControls(engine, left, top, width, height, color) {
  const prevButton = createButton(
    engine, left, top, width, height, color, buttonType.PREV
  );
  const playButton = createButton(
    engine, left + width + controlMargin, top, width, height, color, buttonType.PLAY
  );
  const nextButton = createButton(
    engine, left + 2 * width + 2 * controlMargin, top, width, height, color, buttonType.NEXT
  );
}

const buttonType = {
  PREV: "prevButton",
  PLAY: "playButton",
  NEXT: "nextButton"
}

function createButton(engine, left, top, width, height, color, type)
{
  const rect = createRect(engine, left, top, width, height, color);
  rect.interactive = true;
  rect.hitArea = new PIXI.Rectangle(left, top, width, height);
  rect.click = function() {
    switch (type) {
      case buttonType.PREV:
        engine.prevClick();
        break;
      case buttonType.PLAY:
        engine.playClick();
        break;
      case buttonType.NEXT:
        engine.nextClick();
        break;
    }
  }

  const icon = new PIXI.Graphics();
  icon.beginFill(0, 0);
  icon.lineStyle(controlLineWidth, controlLineColor);

  left = type === buttonType.PREV ? left + width / 5 : left - width / 12;
  top += controlIconMargin;
  width -= controlIconMargin * 2;
  height -= controlIconMargin * 2;

  icon.moveTo(left + width / 2, top);
  if (type === buttonType.PREV) {
    icon.lineTo(left, top + height / 2);
    icon.lineTo(left + width / 2, top + height);
    icon.lineTo(left, top + height / 2);
    icon.lineTo(left + width / 2, top);
  }
  if (type === buttonType.PLAY || type === buttonType.NEXT) {
    icon.lineTo(left + width, top + height / 2);
    icon.lineTo(left + width / 2, top + height);
  }
  if (type === buttonType.NEXT) {
    icon.lineTo(left + width, top + height / 2);
    icon.lineTo(left + width / 2, top);
  }

  icon.endFill();

  engine.entities[type] = rect;
  engine.entities[engine.registrator.generateStaticName()] = icon;
}

function createRoundField(engine, left, top, width, height, bgColor, number) {
  const rect = createRect(engine, left, top, width, height, bgColor);

  if (bgColor != missingRoundColor) {
    rect.interactive = true;
    rect.hitArea = new PIXI.Rectangle(left, top, width, height);
    rect.click = function() {
      engine.roundClick(number);
    }
  }

  const text = createTextLabel(
    engine,
    left + (number < 10 ? width / 3 : width / 4),
    top + height / 4,
    number.toString(),
    roundFontSize
  );

  rect.addChild(text);
  engine.entities["round" + number.toString()] = rect;
}

function createGameField(engine, left, top, width, height, bgColor, player, number) {
  const rect = createRect(engine, left, top, width, height, bgColor);

  let ox = null;
  if (player == 1) {
    ox = createX(
      engine,
      left + width / 2,
      top + height / 2,
      xRadius,
      number
    );
  }
  if (player == 2) {
    ox = createO(
      engine,
      left + width / 2,
      top + height / 2,
      oRadius,
      number
    );
  }

  if (ox != null) {
    rect.addChild(ox);
  }
  engine.entities["xo" + number] = rect;
}

function createX(engine, left, top, radius, number) {
  const x = new PIXI.Graphics();
  x.beginFill(0, 0);
  x.lineStyle(xoLineWidth, xColor);

  x.moveTo(left, top);
  x.lineTo(left - radius, top - radius);
  x.lineTo(left, top);
  x.lineTo(left + radius, top - radius);
  x.lineTo(left, top);
  x.lineTo(left + radius, top + radius);
  x.lineTo(left, top);
  x.lineTo(left - radius, top + radius);
  x.lineTo(left, top);

  x.endFill();

  return x;
}

function createO(engine, left, top, radius, number) {
  const o = new PIXI.Graphics();
  o.beginFill(0, 0);
  o.lineStyle(xoLineWidth, oColor);

  o.drawCircle(left, top, radius - xoLineWidth);

  o.endFill();

  return o;
}

function createTextLabel(engine, left, top, text, fontSize) {
  const label = new PIXI.Text(
    text, {
      font: fontSize.toString() + "px Helvetica",
      fill: "white"
    }
  );
  label.x = left;
  label.y = top;

  return label;
}

function createRect(engine, left, top, width, height, bgColor) {
  const rect = new PIXI.Graphics();
  rect.beginFill(bgColor);
  rect.drawRoundedRect(left, top, width, height);

  return rect;
}
