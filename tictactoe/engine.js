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
    this.switchRound(this.currentRound);

    this.playing = false;
    this.time = null;

    this.registrator = new Registrator();

    createGame(this);
  }

  prevClick() {
    if (this.currentRound > 0) {
      this.switchRound(this.currentRound - 1);
    }
  }

  playClick() {
    this.playing = true;
    this.time = new Date();

    delete this.entities["playButton"];
    createButton(
      engine,
      controlLeft + controlWidth + controlMargin,
      controlTop, controlWidth, controlHeight,
      controlColor,
      buttonType.STOP
    );
    this.scene.addChild(this.entities["stopButton"]);
  }

  stopClick() {
    this.playing = false;
    this.time = null;

    delete this.entities["stopButton"];
    createButton(
      engine,
      controlLeft + controlWidth + controlMargin,
      controlTop, controlWidth, controlHeight,
      controlColor,
      buttonType.PLAY
    );
    this.scene.addChild(this.entities["playButton"]);
  }

  nextClick() {
    if (this.currentRound <= this.game.roundsCount) {
      this.switchRound(this.currentRound + 1);
    } else {
      this.playing = false;
    }
  }

  roundClick(number) {
    this.stopClick();
    this.switchRound(number);
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

        const roundLeft = boardMargin + roundMargin * j + roundWidth * j;
        const roundTop = boardHeight / 1.8 + roundMargin * i + roundHeight * i;

        const roundNum = i * 9 + j + 1;

        let color = missingRoundColor;
        if (roundNum <= this.game.roundsCount) {
          color = fieldColor;
        }
        if (roundNum == this.currentRound) {
          color = currentRoundColor;
        }

        const roundField = createRoundField(
          this,
          roundLeft,
          roundTop,
          roundWidth,
          roundHeight,
          color,
          color == currentRoundColor ? "black" : "white",
          roundNum
        );
      }
    }

    this.scene.removeChildren();
    for (let entity of Object.values(this.entities)) {
      this.scene.addChild(entity);
    }
  }

  render() {
      requestAnimationFrame(this.render.bind(this));

      if (this.playing) {
        if (this.currentRound == this.game.roundsCount) {
          this.stopClick();
        } else {
          const time = new Date();
          if ((time - this.time) / 1000 > 1) {
            this.time = time;
            this.nextClick()
          }
        }
      }


      this.renderer.render(this.scene);
  }
}
