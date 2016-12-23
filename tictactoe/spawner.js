function createControls(left, top, width, height, color) {
  const prevButton = createButton(
    left, top, width, height, color, buttonType.PREV
  );
  const playButton = createButton(
    left + width + controlMargin, top, width, height, color, buttonType.PLAY
  );
  const nextButton = createButton(
    left + 2 * width + 2 * controlMargin, top, width, height, color, buttonType.NEXT
  );

  return prevButton.concat(playButton.concat(nextButton));
}

const buttonType = {
  PREV: 0,
  PLAY: 1,
  NEXT: 2
}

function createButton(left, top, width, height, color, type)
{
  const rect = createRect(left, top, width, height, color);

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

  return [rect, icon]
}

function createRoundField(left, top, width, height, bgColor, number) {
  const rect = createRect(left, top, width, height, bgColor);

  if (bgColor != missingRoundColor) {
    rect.interactive = true;
    rect.hitArea = new PIXI.Rectangle(left, top, width, height);
    rect.click = function() {
      alert("ROUND " + number.toString())
    }
  }

  const text = createTextLabel(
    left + (number < 10 ? width / 3 : width / 4),
    top + height / 4,
    number.toString(),
    roundFontSize
  );

  return [rect, text];
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

function createTextLabel(left, top, text, fontSize) {
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

function createRect(left, top, width, height, bgColor) {
  const rect = new PIXI.Graphics();
  rect.beginFill(bgColor);
  rect.drawRoundedRect(left, top, width, height);

  return rect;
}
