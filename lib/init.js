const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { log } = console;
const { CONFIG_FILE_NAME, CONFIG_FILE_FORCE } = require("./const");

module.exports = ({ force }) => {
  let findFile;
  try {
    res = fs.readFileSync(path.join(process.cwd(), `${CONFIG_FILE_NAME}.js`));
    findFile = `${CONFIG_FILE_NAME}.js`;
  } catch (err) {}
  if (findFile === `${CONFIG_FILE_NAME}.js`) {
    if (!force) {
      log(chalk.yellow(CONFIG_FILE_FORCE[0]));
    } else {
      writeConfigFile();
      log(chalk.green(CONFIG_FILE_FORCE[1]));
    }
  } else {
    writeConfigFile();
    log(chalk.green(CONFIG_FILE_FORCE[2]));
  }
};

function writeConfigFile() {
  const res = fs.readFileSync(
    path.resolve(__dirname, "../template-osser.js"),
    "utf-8"
  );
  fs.writeFileSync(path.join(process.cwd(), `${CONFIG_FILE_NAME}.js`), res);
}
