const path = require("path");
const fs = require("fs");
const { ArrayBuffer } = require("spark-md5");

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

function addHashName({ local, remote, hash, defaultPlace }) {
  const spark = new ArrayBuffer();
  spark.append(fs.readFileSync(local));
  const extname = path.extname(remote);
  const real = remote.split(extname).join("");
  const hashValue = spark
    .end()
    .substring(0, hash === true ? defaultPlace : +hash);
  return `${real}_${hashValue}${extname}`;
}

module.exports = {
  findHtmlFileName,
  handleRemoteDir,
  uniqueArray,
  useRelativePath,
  getFileName,
  addHashName,
};
