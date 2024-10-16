const del = require("del");
const path = require("../config/path.js");

// Delete folder
const clear = () => {
  return del(path.root);
}

module.exports = clear;