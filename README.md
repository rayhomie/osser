# osser

Provide multi-mode Alibaba Cloud OSS interactive command line upload tool

![Build Status](https://github.com/tj/commander.js/workflows/build/badge.svg)
[![NPM Version](http://img.shields.io/npm/v/osser.svg?style=flat)](https://www.npmjs.com/package/osser)

Read in other languages: English | [简体中文](./Readme_zh-CN.md)

### Install

```bash
#Global install dependency
npm install -g osser

#Check the version number
osser -v
```

### Add configuration file

You need to put an oss initialization configuration file `osser.js` or `osser.json` in the project root directory. 

AccessKey must be configured before it can be used normally.

Use the command `osser init` to initialize the osser.js file in the current directory. If the osser.js file exists in the current directory, it will not be overwritten. If you need to force the rewriting of osser.js, use the command `osser init -- force` or `osser init - f`

[Configuration Item Reference Link](https://help.aliyun.com/document_detail/64097.html)

```js
module.exports = {
  //Required oss configuration items
  //Reference: https://help.aliyun.com/document_detail/64097.html
  region: "",
  accessKeyId: "",
  accessKeySecret: "",
  bucket: "",

  //Optional configuration items for upload request
  fetchOptions: {
    timeout: 100 * 1000,
  },
};
```

### glob pattern

Use [**glob pattern**](https://github.com/isaacs/node-glob) to match all files that need to be uploaded

```bash
# Specify to upload all files in the dist folder of the local current directory to the root path of the remote oss bucket
osser --glob dist/**/*

# Can be abbreviated with -g
osser -g dist/**/*
```

Multiple glob strings can be used to match files:

```bash
osser -g dist/**/* static/**/*.png 
```

The matching path contains a relative path, and all matched files will be uploaded directly to the specified remote path, and folders will not be recursively created to store these files:

```bash
osser -g ../dist/**/*
# For example: (matching character contains relative path../, ./, / etc.)
# The matched file name is: ../dist/mode/name.js
# The path to upload to oss is: name.js
```

```bash
osser -g ../dist/**/* -d xiaohong 
# The matched file name is: ../dist/mode/name.js
# The path to upload to oss is: xiaohong/name.js
```

If the same file is matched, it will be deduplicated:

```bash
osser -g **/** dist/**
# At this time, it will definitely match the same file, then perform de-duplication processing
```

You can use the --dir option to specify the bucket root directory for uploading oss:

```bash
# At this time, the matched files will be uploaded with xiaoming as the root directory
osser -g dist/**/* --dir xiaoming
# For example:
# The matched file name is: dist/mode/name.js
# The path to upload to oss is: xiaoming/dist/mode/name.js
```

Use the `--hash` option to add a hash value to the uploaded file name:

```bash
osser -g dist/**/* --hash
# The default is an eight-digit hash value
# dist/mode/name_d8jy7cz1.js

osser -g dist/**/* -h 4
# You can also specify the number of hash palce
# dist/mode/name_d8jy.js 
```

Use the `--time` option to add a timestamp to the uploaded file name:

```bash
osser -g dist/**/* --time
# dist/mode/name_20210828121131.js 

# You can also use the -t abbreviation
osser -g dist/**/* -t

# You can also specify the hash value and timestamp at the same time
osser -g dist/**/* -t -h
# dist/mode/name_d8jy7cz1_20210828121131.js 
```

