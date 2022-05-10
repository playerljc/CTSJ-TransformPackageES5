#TransformPackageES5

Simplified Chinese | [English](./README.md)

#### Convert the package to es5

## Introduction

Some packages on npm are not converted to es5, or only partially converted. When we build the host project, we will not build the third-party packages in node_modules. This library is used for building tools (such as webpack). etc.) The constructed js is converted to es5 again.

## Install
````
npm install @ctsj/transform-package-es5 -g
````

````
yarn add @ctsj/transform-package-es5
````

## use
``` js
ctpe transform -p src -d dist
````

## Parameter Description

-p: directory to convert

-d: output directory
