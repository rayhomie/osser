module.exports = {
  CONFIG_FILE_NAME: "osser",
  NO_OSSER_FILE_ERR:
    "Error: please place the osser.js or osser.json in the root directory of the project.\n",
  NO_OPTION_ERR: "Error: with current option to upload files.",
  ONLY_ONE_OPTION_ERR:
    "Error: you can use only one mode to upload files at the same time.",
  FAIL_UPLOAD_ERR: "Error: upload fail.\n",
  SUCCESS_UPLOAD_NOTICE:
    "\n\nSuccess: The above files were uploaded successfully.",
  NO_FIND_FILE_WARN:
    "Warning: No files have been uploaded. Please make sure the glob matches correctly.",
  RELATIVE_REMOTE_WARN:
    "Waring: The matching path contains relative paths. \nAll matched files will be directly uploaded to the specified remote path. \nFolders will not be created recursively to store these files.",
  ENTRY_FILE_TITLE: "\nEntry HTML File：",
  NO_PLACE_WARN:
    "Waring: If hash place is not specified, the 8-bit hash value is the default.",
  VERSION: {
    OPTION: "-v, --version",
    DESCRIPTION: "output the current version.",
  },
  TIME: {
    OPTION: "-t, --time",
    DESCRIPTION: "filename with current time.",
  },
  HASH: {
    OPTION: "-h, --hash [place]",
    DESCRIPTION: "filename with hash. No place default 8 palce hash value",
  },
  DIR: {
    OPTION: "-d, --dir <dir>",
    DESCRIPTION:
      "remote directory to store uploaded files (default root directory).",
    DEFAULT_VALUE: "",
  },
  GLOB: {
    OPTION: "-g, --glob <patterns...>",
    DESCRIPTION: "glob mode : use glob pattern to upload files or file folder.",
  },
  PATH: {
    OPTION: "-p, --path <paths...>",
    DESCRIPTION: "path mode : use path to upload files.",
  },
  INIT: {
    CMD: "init",
    OPTION: "-f, --force",
    OPTION_DESCRIPTION: "Overwrite target directory if it exists",
    DESCRIPTION: "Initialization config template",
  },
  CONFIG_FILE_FORCE: [
    "Waring: Make sure that osser.js already exists. If you want to override it, add the option -f or --force.",
    "Success: The osser.js configuration file has been forcibly reset.",
    "Success: The osser.js configuration file has been successfully written to the root directory.",
  ],
};
