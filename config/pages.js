"use strict";

const glob = require("glob");
const path = require("path");
const paths = require("./paths");

const pageFiles = glob.sync(path.join(paths.appPages, "*.tsx"));
const entries = Object.assign(
  {},
  ...pageFiles.map(file => {
    const entryName = path.basename(file, ".tsx");
    return {
      [entryName]: file,
    }
  }),
);

module.exports = {
  entries: entries,
};