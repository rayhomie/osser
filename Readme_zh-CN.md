# osser

提供多模式的阿里云 oss 交互式命令行上传工具

![Build Status](https://github.com/tj/commander.js/workflows/build/badge.svg)
[![NPM Version](http://img.shields.io/npm/v/osser.svg?style=flat)](https://www.npmjs.com/package/osser)
[![Install Size](https://packagephobia.now.sh/badge?p=osser)](https://www.npmjs.com/package/osser)

使用其他语言阅读：[English](./README.md) | 简体中文



### 安装

```bash
#全局安装依赖
npm install -g osser

#检查版本号
osser -v
```



### 添加配置文件

需要在项目根目录下，放一个 oss 初始化的配置文件 osser.js 或者 osser.json。必须配置AccessKey，才可以正常使用。

[配置项参考链接](https://help.aliyun.com/document_detail/64097.html)

```js
module.exports = {
  //必填的oss配置项
  //Reference: https://help.aliyun.com/document_detail/64097.html
  region: "",
  accessKeyId: "",
  accessKeySecret: "",
  bucket: "",

  //可选填的上传请求的配置项
  fetchOptions: {
    timeout: 100 * 1000,
  },
};
```



### glob模式

通过**[glob模式](https://github.com/isaacs/node-glob)**来匹配需要上传的所有文件：

```bash
#指定上传 本地当前目录的dist文件夹下所有文件 到 远端oss的bucket的根路径下
osser -g dist/**/*
```

可使用多个glob字符串来匹配文件：

```bash
osser -g dist/**/* static/**/*.png
```

匹配路径中含有相对路径，匹配到的所有文件将直接上传至指定远端路径下，不会递归创建文件夹来存放这些文件