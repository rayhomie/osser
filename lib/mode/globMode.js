const path = require("path");
const glob = require("glob");
const uploadOss = require("../upload");
const { handleRemoteDir, uniqueArray } = require("../utils");

module.exports = (patterns, remoteDir, { fetchOptions, ...ossConfig }) => {
  const fileArr = uniqueArray(
    patterns.reduce((store, pattern) => {
      store.push(...glob.sync(pattern, { nodir: true, cwd: process.cwd() }));
      return store;
    }, [])
  ).reduce((pre, item) => {
    pre.push({
      local: path.join(process.cwd(), item),
      remote: `${handleRemoteDir(remoteDir)}/${item}`,
      original: item,
    });
    return pre;
  }, []);

  uploadOss(fileArr, ossConfig, fetchOptions);
};
