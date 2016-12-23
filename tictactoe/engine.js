class Engine {
  constructor() {
    this.canvas = document.getElementById("game");
    this.canvas.width = width;
    this.canvas.height = height;

    this.renderer = PIXI.autoDetectRenderer(
      this.canvas.width, this.canvas.height, { view: this.canvas }, true, true
    );
    this.renderer.backgroundColor = bgColor;

    this.scene = new PIXI.Container();

    this.game = parseMatch(match);

    this.entities = {};

    this.currentRound = 0;

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
    this.switchRound(number - 1);
  }

  switchRound(number) {
    this.currentRound = number;

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
          this.game.fields[number][i][j],
          coord
        );
      }
    }

    engine.scene.removeChildren();
    for (let entity of Object.values(engine.entities)) {
      engine.scene.addChild(entity);
    }
  }

  render() {
      requestAnimationFrame(this.render.bind(this));

      this.renderer.render(this.scene);
  }
}
