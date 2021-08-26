const path = require("path");
const { Command } = require("commander");
const { version } = require("../package.json");
const cwdPath = process.cwd();
const ossoptionPath = path.join(cwdPath, "ossoption");

const program = new Command();

program
  .version(version, "-v, --version", "output the current version")
  .option(
    "-g, --glob <patterns...>",
    "glob mode : use glob pattern to upload files or file folder"
  )
  .option("-p, --path <paths...>", "path mode : use path to upload")
  .action(({ glob, path }) => {
    if (!glob && !path) {
      console.error("welcome use ross, with option to upload files");
      return;
    }
    if (glob && path) {
      console.error(
        "error: you can use only one mode to upload files at the same time"
      );
      return;
    }
    glob && require("./mode/globMode");
    path && require("./mode/pathMode");
  });

program.parse(process.argv);
