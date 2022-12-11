class BaseCommand {
  constructor() {
    if (this.constructor === BaseCommand) {
      throw new Error("Can't instantiate abstract class!");
    }
  }

  name() {
    throw new Error("Abstract method!");
  }

  description() {
    throw new Error("Abstract method!");
  }

  execute() {
    throw new Error("Abstract method!");
  }
}

module.exports = BaseCommand;