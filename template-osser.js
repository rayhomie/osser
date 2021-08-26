module.exports = {
  //required option of oss
  //Reference: https://help.aliyun.com/document_detail/64097.html
  region: "",
  accessKeyId: "",
  accessKeySecret: "",
  bucket: "",

  //optional option of fetching upload
  fetchOptions: {
    timeout: 100 * 1000,
  },
};
