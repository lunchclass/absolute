const path = require('path');

const rootPath = path.resolve(__dirname, '..');

const root = (...args) => {
  return path.join.apply(path, [rootPath].concat(args));
};


exports.root = root;
