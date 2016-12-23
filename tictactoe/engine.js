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

    this.currentField = new Array(9).fill(new Array(9).fill(0));

    this.setCurrentRound(2);

    this.registrator = new Registrator();

    createGame(this);
  }

  prevClick() {
    alert("Prev clicked");
  }

  playClick() {
    alert("Play clicked");
  }

  nextClick() {
    alert("NextClicked");
  }

  roundClick(number) {
    alert("ROUND " + number.toString())
  }

  setCurrentRound(number) {
    this.currentRound = number;

    for (let r = 0; r < this.currentRound; r++) {
      this.currentField[this.game.moves[r].x][this.game.moves[r].y] =
       r % 2 == 0 ? 1 : 2;
    }
  }

  render() {
      requestAnimationFrame(this.render.bind(this));

      this.renderer.render(this.scene);
  }
}
