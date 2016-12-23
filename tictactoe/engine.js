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

    this.entities = {};

    this.setCurrentRound(0);

    this.registrator = new Registrator();

    createGame(this);
  }

  prevClick() {
    if (this.currentRound > 0) {
      this.switchRound(this.currentRound - 1);
    }
  }

  playClick() {
    alert("Play clicked");
  }

  nextClick() {
    if (this.currentRound < this.game.roundsCount - 1) {
      this.switchRound(this.currentRound + 1);
    }
  }

  roundClick(number) {
    this.switchRound(number);
  }

  setCurrentRound(number) {
    this.currentRound = number;

    this.currentField = new Array(9).fill(new Array(9).fill(0));
    for (let r = 0; r < this.currentRound; r++) {
      this.currentField[this.game.moves[r].x][this.game.moves[r].y] =
       r % 2 == 0 ? 1 : 2;
    }
  }

  switchRound(number) {
    this.setCurrentRound(number);

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const coord = i * 9 + j;
        const fieldLeft = boardLeft + fieldMargin * calcIndent(j) + fieldWidth * j;
        const fieldTop = boardMargin + fieldMargin * calcIndent(i) + fieldHeight * i;

        createGameField(
          this,
          fieldLeft,
          fieldTop,
          fieldWidth,
          fieldHeight,
          fieldColor,
          this.currentField[i][j],
          coord
        );
      }
    }
  }

  render() {
      requestAnimationFrame(this.render.bind(this));

      for (let entity of Object.values(engine.entities)) {
        engine.scene.addChild(entity);
      }

      this.renderer.render(this.scene);
  }
}
