function createControls(left, top, width, height, color) {
  const leftButton = createRect(left, top, width, height, color);
  const centerButton = createRect(
    left + width + controlMargin, top, width, height, color
  );
  const rightButton = createRect(
    left + 2 * width + 2 * controlMargin, top, width, height, color
  );

  return [leftButton, centerButton, rightButton];
}

function createGameField(left, top, width, height, bgColor, player) {
  const rect = createRect(left, top, width, height, bgColor);

  let xo = null;
  if (player == 1) {
    xo = createX(
      left + width / 2,
      top + height / 2,
      xRadius
    );
  }
  if (player == 2) {
    xo = createO(
      left + width / 2,
      top + height / 2,
      oRadius
    );
  }

  return [rect, xo];
}

function createRoundField(left, top, width, height, bgColor, number) {
  const rect = createRect(left, top, width, height, bgColor);

  const text = new PIXI.Text(
    number.toString(), {
      font: roundTextSize.toString() + "px Helvetica",
      fill: "white"
    }
  );
  text.x = left + (number < 10 ? width / 3 : width / 4);
  text.y = top + height / 4;

  return [rect, text];
}

function createRect(left, top, width, height, bgColor) {
  const rect = new PIXI.Graphics();
  rect.beginFill(bgColor);
  rect.drawRoundedRect(left, top, width, height);

  return rect;
}

function createX(left, top, radius) {
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

function createO(left, top, radius) {
  const o = new PIXI.Graphics();
  o.beginFill(0, 0);
  o.lineStyle(xoLineWidth, oColor);

  o.drawCircle(left, top, radius - xoLineWidth);

  o.endFill();

  return o;
}
