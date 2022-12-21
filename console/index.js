const BaseCommand = require('./commands/BaseCommand');

class Console {
  constructor() {
    this.commands = {};
    this.commandToExecute = "";
  }

  run() {
    this.#loadCommands();
    this.#validateArguments();
    this.#execute();
  }

  #loadCommands() {
    const fs = require('fs');
    const path = __dirname + '/commands/';
    fs.readdirSync(path).forEach((file) => {
        const commanPath = path + file;
        const command = require(commanPath);
        if(command instanceof BaseCommand) {
          this.commands[command.name()] = command;
        }
    });
  }

  #validateArguments() {
    if(process.argv.length < 3) {
      console.info("Available commands");
      for(const key in this.commands) {
        console.info(`- ${this.commands[key].name()}: ${this.commands[key].description()}`);
      }
      process.exit(0);
    }
    
    this.commandToExecute = process.argv[2];
  }

  #execute() {
    if(this.commands.hasOwnProperty(this.commandToExecute)) {
      this.commands[this.commandToExecute].execute();
    }
    else {
      console.error(`Command "${this.commandToExecute}" not found.`);
      process.exit(1);
    }
  }
}

new Console().run();