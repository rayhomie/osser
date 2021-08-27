const path = require("path");
const { Command } = require("commander");
const { version } = require("../package.json");
const globAction = require("./mode/globMode");
const pathAction = require("./mode/pathMode");
const chalk = require("chalk");
const { log } = console;
const {
  CONFIG_FILE_NAME,
  NO_OSSER_FILE_ERR,
  NO_OPTION_ERR,
  ONLY_ONE_OPTION_ERR,
  VERSION,
  DIR,
  GLOB,
  PATH,
} = require("./const");

let ossConfig;
try {
  ossConfig = require(path.join(process.cwd(), CONFIG_FILE_NAME));
} catch (error) {
  log(chalk.red(NO_OSSER_FILE_ERR), error);
  return;
}

const program = new Command();

program
  .version(version, VERSION.OPTION, VERSION.DESCRIPTION)
  .option(DIR.OPTION, DIR.DESCRIPTION, DIR.DEFAULT_VALUE)
  .option(GLOB.OPTION, GLOB.DESCRIPTION)
  .option(PATH.OPTION, PATH.DESCRIPTION)
  .action(({ glob, path: inpath, dir: remoteDir }) => {
    if (!glob && !inpath) {
      log(chalk.red(NO_OPTION_ERR));
      return;
    }

    if (glob && inpath) {
      log(chalk.red(ONLY_ONE_OPTION_ERR));
      return;
    }

    glob && globAction(glob, remoteDir, ossConfig);

    inpath && pathAction(inpath, remoteDir, ossConfig);
  })
  .parse(process.argv);
