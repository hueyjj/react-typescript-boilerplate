"use strict";

const fs = require("fs");
const path = require("path");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appPath: resolveApp("."),
  appBuild: resolveApp("build"),
  appPages: resolveApp("src/pages"),
  appSrc: resolveApp("src"),
};
console.log(module.exports)