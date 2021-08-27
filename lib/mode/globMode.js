const path = require("path");
const glob = require("glob");
const chalk = require("chalk");
const uploadOss = require("../upload");
const { log } = console;
const {
  handleRemoteDir,
  uniqueArray,
  useRelativePath,
  getFileName,
} = require("../utils");
const { RELATIVE_REMOTE_WARN } = require("../const");

let useRP;

module.exports = (patterns, remoteDir, { fetchOptions, ...ossConfig }) => {
  const fileArr = uniqueArray(
    patterns.reduce((store, pattern) => {
      store.push(...glob.sync(pattern, { nodir: true, cwd: process.cwd() }));
      return store;
    }, [])
  ).reduce((pre, item) => {
    const absoluteRemote = `${handleRemoteDir(remoteDir)}/${item}`;
    const relativeRemote = `${handleRemoteDir(remoteDir)}/${getFileName(item)}`;
    useRP = useRelativePath(absoluteRemote);
    pre.push({
      local: path.join(process.cwd(), item),
      remote: useRP ? relativeRemote : absoluteRemote,
      original: item,
    });

    return pre;
  }, []);

  useRP && log(chalk.yellow(RELATIVE_REMOTE_WARN));

  uploadOss(fileArr, ossConfig, fetchOptions);
};
