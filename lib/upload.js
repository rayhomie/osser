const path = require("path");

module.exports = (fileArr, ossConfig) => {
  const OSS = require("ali-oss");

  const client = new OSS(ossConfig);

  async function put({ local, remote }) {
    try {
      return await client.put(remote, path.normalize(local));
    } catch (error) {
      console.log(error);
    }
  }

  return Promise.all(fileArr.map((file) => put(file)))
    .then((result) => {
      console.log(result.map(({ url }) => url));
    })
    .catch((error) => console.error(error));
};
