# osser

提供多模式的阿里云 oss 交互式命令行上传工具

![Build Status](https://github.com/tj/commander.js/workflows/build/badge.svg)
[![NPM Version](http://img.shields.io/npm/v/osser.svg?style=flat)](https://www.npmjs.com/package/osser)

使用其他语言阅读：[English](./README.md) | 简体中文

### 安装

```bash
#全局安装依赖
npm install -g osser

#检查版本号
osser -v
```

### 添加配置文件

需要在项目根目录下，放一个 oss 初始化的配置文件 osser.js 或者 osser.json。必须配置 AccessKey，才可以正常使用。

使用命令`osser init`在当前目录初始化osser.js文件，当前目录下存在osser.js文件则不会被重写。如果需要强制重写osser.js，使用命令`osser init --force`或者`osser init -f`

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

### glob 模式

通过**[glob 模式](https://github.com/isaacs/node-glob)**来匹配需要上传的所有文件：

```bash
# 指定上传 本地当前目录的dist文件夹下所有文件 到 远端oss的bucket的根路径下
osser --glob dist/**/*

# 可用-g进行缩写
osser -g dist/**/*
```

可使用多个 glob 字符串来匹配文件：

```bash
osser -g dist/**/* static/**/*.png 
```

匹配路径中含有相对路径，匹配到的所有文件将直接上传至指定远端路径下，不会递归创建文件夹来存放这些文件：

```bash
osser -g ../dist/**/*
# 比如：(匹配符含有相对路径../，./，/等)
# 匹配到的文件名是：../dist/mode/name.js
# 上传到oss的路径为：name.js
```

```bash
osser -g ../dist/**/* -d xiaohong 
# 匹配到的文件名是：../dist/mode/name.js
# 上传到oss的路径为：xiaohong/name.js
```

匹配到有相同的文件，会进行去重处理：

```bash
osser -g **/** dist/**
# 此时肯定会匹配到相同的文件，则进行去重处理
```

可以使用--dir选项来指定上传oss的bucket根目录：

```bash
# 此时会将匹配到的文件，以xiaoming为根目录进行上传
osser -g dist/**/* --dir xiaoming
# 比如：
# 匹配到的文件名是：dist/mode/name.js
# 上传到oss的路径为：xiaoming/dist/mode/name.js
```

使用`--hash`选项，给上传的文件名称添加哈希值：

```bash
osser -g dist/**/* --hash
# 默认是八位哈希值
# dist/mode/name_d8jy7cz1.js 

osser -g dist/**/* -h 4
# 也可以指定哈希位数
# dist/mode/name_d8jy.js 
```

使用`--time`选项，给上传的文件名称添加时间戳：

```bash
osser -g dist/**/* --time
# dist/mode/name_20210828121131.js 

# 也可以使用-t缩写
osser -g dist/**/* -t

# 也可以同时指定哈希值和时间戳
osser -g dist/**/* -t -h
# dist/mode/name_d8jy7cz1_20210828121131.js 
```



