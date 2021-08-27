const path = require("path");
const uploadOss = require("../upload");
const glob = require("glob");

module.exports = (patterns, remoteDir, { fetchOptions, ...ossConfig }) => {
  const handleRemoteDir = remoteDir
    .split("/")
    .filter((i) => i)
    .join("/");

  const fileArr = [
    ...new Set(
      patterns.reduce((store, pattern) => {
        store.push(...glob.sync(pattern, { nodir: true, cwd: process.cwd() }));
        return store;
      }, [])
    ),
  ].reduce((pre, item) => {
    pre.push({
      local: path.join(process.cwd(), item),
      remote: `${handleRemoteDir}/${item}`,
      original: item,
    });
    return pre;
  }, []);

  uploadOss(fileArr, ossConfig, fetchOptions);
};
