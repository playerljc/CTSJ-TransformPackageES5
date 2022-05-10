# TransformPackageES5

简体中文 | [English](./README.md)

#### 对package进行es5的转换

## 简介

有些npm上的package并没有进行es5的转换，或者只转换了一部分，而我们对宿主工程进行构建的时候，并不会对node_modules中的第三方包进行构建，本库是对构建工具(如webpack等)构建后的js再进行一次es5的转换。

## 安装
``` 
npm install @ctsj/transform-package-es5 -g
```

``` 
yarn add @ctsj/transform-package-es5
```

## 使用
``` js
ctpe transform -p src -d dist
```

## 参数说明

-p: 转换的目录

-d: 输出的目录
