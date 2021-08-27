const path = require("path");
const OSS = require("ali-oss");
const chalk = require("chalk");
const { log } = console;
const { findHtmlFileName } = require("./utils");
const {
  FAIL_UPLOAD_ERR,
  SUCCESS_UPLOAD_NOTICE,
  NO_FIND_FILE_WARN,
  ENTRY_FILE_TITLE,
} = require("./const");

module.exports = (fileArr, ossConfig, fetchOptions) => {
  if (!fileArr.length) {
    log(chalk.yellow(NO_FIND_FILE_WARN));
    return;
  }

  const client = new OSS(ossConfig);

  async function put({ local, remote }) {
    try {
      return await client.put(remote, path.normalize(local), fetchOptions);
    } catch (error) {
      log(chalk.red(FAIL_UPLOAD_ERR), error);
    }
  }

  return Promise.all(fileArr.map((file) => put(file)))
    .then((res) => {
      const result = res.map(({ url }) => url);
      log(result, chalk.green(SUCCESS_UPLOAD_NOTICE));
      const html = findHtmlFileName(result);
      html !== "\n" && log(chalk.white.bgGreen(ENTRY_FILE_TITLE), html);
    })
    .catch((error) => console.error(error));
};
