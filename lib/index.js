const path = require("path");
const { Command } = require("commander");

const { version } = require("../package.json");
const cwdPath = process.cwd();
const ossoptionPath = path.join(cwdPath, "ossoption.js");

const program = new Command();

program
  .version(version)
  .option(
    "-g, --glob <pattern>",
    "use glob pattern to upload files or file folder"
  )
  .option("-p, --path <path>", "use path to upload")
  .action((option) => {
    console.log(option);
  });
