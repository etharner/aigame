function createRect(left, top, width, height, borderWidth, borderColor) {
  const rect = new PIXI.Graphics();
  rect.beginFill(0, 0);
  rect.lineStyle(borderWidth, borderColor);
  rect.drawRect(left, top, width, height);

  return rect;
}
