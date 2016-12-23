class Registrator {
  constructor() {
    this.staticId = 0;
  }

  generateStaticName() {
    const name = "static" + this.staticId;
    this.staticId++;

    return name;
  }
}
