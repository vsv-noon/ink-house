const { src, dest } = require('gulp');

// Config
const path = require('../config/path.js');
const app = require('../config/app.js');

// Plugins
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const files = () => {
  return src(path.files.src)
  .pipe(plumber({
    errorHandler: notify.onError(error => ({
      title: "Files",
      message: error.message
    }))
  }))
  .pipe(dest(path.files.dest))
}

module.exports = files;