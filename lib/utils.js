const path = require("path");
function findHtmlFileName(fileArr) {
  return fileArr.reduce((str, cur) => {
    if (path.extname(cur) === ".html") {
      str += `${cur}\n`;
    }
    return str;
  }, "\n");
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
