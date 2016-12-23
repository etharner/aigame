class Engine {
  constructor() {
    this.canvas = document.getElementById("game");
    this.canvas.width = width;
    this.canvas.height = height;

    this.renderer = PIXI.autoDetectRenderer(
      this.canvas.width, this.canvas.height, { view: this.canvas }, true, true
    );
    this.renderer.backgroundColor = bgColor;

    this.scene = new PIXI.Stage();

    this.game = parseMatch(match);

    this.entities = [];

    this.drawGameField(game, 29);
  }

  drawGameField(game, round) {
    let currentField = new Array(9).fill(new Array(9).fill(0));

    for (let r = 0; r < round; r++) {
      currentField[this.game.moves[r].x][this.game.moves[r].y] = r % 2 == 0 ? 1 : 2;
    }

    this.entities.push(createTextLabel(boardLeft / 3, boardMargin, "TicTacToe", fontSize));
    this.entities.push(createTextLabel(
      boardLeft / 6,
      height / 10,
      this.game.firstPlayer + " vs " + this.game.secondPlayer,
      fontSize
    ));

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const fieldLeft = boardLeft + fieldMargin * this.calcIndent(j) + fieldWidth * j;
        const fieldTop = boardMargin + fieldMargin * this.calcIndent(i) + fieldHeight * i;

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
          roundNum <= this.game.roundsCount ? fieldColor : missingRoundColor,
          roundNum
        );

        this.entities.push.apply(this.entities, gameField);
        this.entities.push.apply(this.entities, roundField);
      }
    }

    const controls = createControls(
      controlLeft,
      controlTop,
      controlWidth,
      controlHeight,
      controlColor
    );

    this.entities.push.apply(this.entities, controls);

    for (let entity of this.entities) {
      if (entity != null) {
        this.scene.addChild(entity);
      }
    }
  }

  calcIndent(c) {
    let indent = c + 1;
    if (c / 3 > 0) {
      return Math.floor(c / 3) + indent;
    }

    return indent;
  }

  render() {
      requestAnimationFrame(this.render);

      this.renderer.render(this.scene);
  }
}
