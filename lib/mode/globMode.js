const path = require("path");
const glob = require("glob");
const chalk = require("chalk");
const uploadOss = require("../upload");
const { log } = console;
const { RELATIVE_REMOTE_WARN, NO_PLACE_WARN } = require("../const");
const {
  handleRemoteDir,
  uniqueArray,
  useRelativePath,
  getFileName,
  addHashName,
  addTimeName,
} = require("../utils");

let useRP;

module.exports = ({
  glob: patterns,
  remoteDir,
  ossConfig: { fetchOptions, ...ossConfig },
  time,
  hash,
}) => {
  const fileArr = uniqueArray(
    patterns.reduce((store, pattern) => {
      store.push(...glob.sync(pattern, { nodir: true, cwd: process.cwd() }));
      return store;
    }, [])
  ).reduce((pre, item) => {
    const local = path.join(process.cwd(), item);
    const absoluteRemote = `${handleRemoteDir(remoteDir)}/${item}`;
    const relativeRemote = `${handleRemoteDir(remoteDir)}/${getFileName(item)}`;
    useRP = useRelativePath(absoluteRemote);
    let realRemote = useRP ? relativeRemote : absoluteRemote;

    if (hash) {
      realRemote = addHashName({
        local,
        remote: realRemote,
        hash,
        defaultPlace: 8,
      });
    }

    if (time) {
      realRemote = addTimeName(realRemote);
    }

    pre.push({
      local,
      remote: realRemote,
      original: item,
    });

    return pre;
  }, []);

  hash === true && log(chalk.yellow(NO_PLACE_WARN));
  useRP && log(chalk.yellow(RELATIVE_REMOTE_WARN));

  uploadOss(fileArr, ossConfig, fetchOptions);
};
