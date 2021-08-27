const path = require("path");
const { Command } = require("commander");
const { version } = require("../package.json");
const globAction = require("./mode/globMode");
const pathAction = require("./mode/pathMode");

const program = new Command();

program
  .version(version, "-v, --version", "output the current version.")
  .option(
    "-d, --dir <dir>",
    "remote directory to store uploaded files (default root directory).",
    ""
  )
  .option(
    "-g, --glob <patterns...>",
    "glob mode : use glob pattern to upload files or file folder."
  )
  .option("-p, --path <paths...>", "path mode : use path to upload files.")
  .action(({ glob, path: inpath, dir: remoteDir }) => {
    if (!glob && !inpath) {
      console.error("error: with current option to upload files.");
      return;
    }

    if (glob && inpath) {
      console.error(
        "error: you can use only one mode to upload files at the same time"
      );
      return;
    }

    try {
      const ossConfig = require(path.join(process.cwd(), "osser"));
      glob && globAction(glob, remoteDir, ossConfig);
      inpath && pathAction(inpath, remoteDir, ossConfig);
    } catch (error) {
      console.error(
        "error: please place the osser.js or osser.json in the root directory of the project.\n",
        error
      );
    }
  })
  .parse(process.argv);
