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

    this.currentRound = 10;

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

  render() {
      requestAnimationFrame(this.render.bind(this));

      this.renderer.render(this.scene);
  }
}
