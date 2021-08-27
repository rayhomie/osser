const path = require("path");
function findHtmlFileName(fileArr) {
  return fileArr.find((item) => path.extname(item) === ".html");
}

function handleRemoteDir(remoteDir) {
  return remoteDir
    .split("/")
    .filter((i) => i)
    .join("/");
}

function uniqueArray(array) {
  return [...new Set(array)];
}

module.exports = { findHtmlFileName, handleRemoteDir, uniqueArray };
