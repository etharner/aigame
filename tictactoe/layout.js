const width = 1280;
const height = 960;

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
