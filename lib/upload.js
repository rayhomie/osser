const path = require("path");
const OSS = require("ali-oss");
const { findHtmlFileName } = require("./utils");

module.exports = (fileArr, ossConfig, fetchOptions) => {
  const client = new OSS(ossConfig);

  async function put({ local, remote }) {
    try {
      return await client.put(remote, path.normalize(local), fetchOptions);
    } catch (error) {
      console.log(error);
    }
  }

  return Promise.all(fileArr.map((file) => put(file)))
    .then((res) => {
      const result = res.map(({ url }) => url);
      console.log(result, "\n上传成功");
      const html = findHtmlFileName(result);
      html && console.log(html);
    })
    .catch((error) => console.error(error));
};
