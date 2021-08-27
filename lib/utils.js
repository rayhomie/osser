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
    .split(".")
    .filter((i) => i)
    .join("/")
    .split("/")
    .filter((i) => i)
    .join("/");
}

function uniqueArray(array) {
  return [...new Set(array)];
}

function useRelativePath(pathname) {
  const set = new Set([".", "..", ""]);
  return pathname
    .split(path.extname(pathname))
    .join("")
    .split("/")
    .some((i) => set.has(i));
}

function getFileName(pathname) {
  const extname = path.extname(pathname);
  const arr = pathname.split(extname).join("").split("/");
  return `${arr[arr.length - 1]}${extname}`;
}
module.exports = {
  findHtmlFileName,
  handleRemoteDir,
  uniqueArray,
  useRelativePath,
  getFileName,
};
