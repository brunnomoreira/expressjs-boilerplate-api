/**
 * Util to read/write directly from/in env file.
 * https://stackoverflow.com/a/68780811
 */

const fs = require("fs");
const os = require("os");
const path = require("path");

class Env {
  constructor() {
    this.envFilePath = path.resolve(__dirname, "../../.env");
  }

  #readEnvVars() {
    return fs.readFileSync(this.envFilePath, "utf-8").split(os.EOL);
  }

  getEnvValue(key) {
    // find the line that contains the key (exact match)
    const matchedLine = this.#readEnvVars().find((line) => line.split("=")[0] === key);
    // split the line (delimiter is '=') and return the item at index 2
    return matchedLine !== undefined ? matchedLine.split("=")[1] : null;
  }

  setEnvValue(key, value) {
    const envVars = this.#readEnvVars();
    const targetLine = envVars.find((line) => line.split("=")[0] === key);
    if (targetLine !== undefined) {
      // update existing line
      const targetLineIndex = envVars.indexOf(targetLine);
      // replace the key/value with the new value
      envVars.splice(targetLineIndex, 1, `${key}="${value}"`);
    } else {
      // create new key value
      envVars.push(`${key}="${value}"`);
    }
    // write everything back to the file system
    fs.writeFileSync(this.envFilePath, envVars.join(os.EOL));
  };
}

const instance = new Env();

module.exports = instance;