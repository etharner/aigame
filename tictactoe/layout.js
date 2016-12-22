const width = 1280;
const height = 960;

const boardMargin = height / 60;
const boardLeft = width - height + boardMargin;
const boardWidth = height - boardMargin * 2;
const boardHeight = boardWidth;
const boardBorderWidth = 5;

const fieldMargin = boardHeight / 60;
const fieldWidth = (boardWidth - fieldMargin * 12) / 9;
const fieldHeight = fieldWidth;
