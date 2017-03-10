const width = 1280;
const height = 960;

const fontSize = height / 30;

const boardMargin = height / 60;
const boardLeft = width - height + boardMargin;
const boardWidth = height - boardMargin * 2;
const boardHeight = boardWidth;

const fieldMargin = boardHeight / 60;
const fieldWidth = (boardWidth - fieldMargin * 12) / 9;
const fieldHeight = fieldWidth;

const xoLineWidth = 3;
const oRadius = fieldWidth / 2;
const xRadius = fieldWidth / 2 - width / 150;

const roundMargin = fieldMargin / 2;
const roundWidth = fieldWidth / 3;
const roundHeight = roundWidth;
const roundFontSize = roundWidth / 2;

const controlMargin = roundMargin;
const controlLeft = boardMargin;
const controlTop = boardHeight / 1.8 + roundMargin * 9 + roundHeight * 9;
const controlWidth = (roundWidth * 9 + roundMargin * 8 - controlMargin * 2) / 3;
const controlHeight = roundHeight * 2;
const controlLineWidth = xoLineWidth;
const controlIconMargin = controlMargin;
