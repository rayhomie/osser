const path = require("path");
const { Command } = require("commander");

const { version } = require("../package.json");
const cwdPath = process.cwd();
const pkgPath = path.join(cwdPath, "package.json");
const ossoptionPath = path.join(cwdPath, "ossoption.js");

const program = new Command();

program
  .version(version)
  .option("-d, --debug", "output extra debugging")
  .action((option) => {});

program.parse(process.argv);
