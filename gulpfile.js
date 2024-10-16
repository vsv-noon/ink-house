const { watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();

// Config
const path = require("./gulp/config/path.js");
const app = require('./gulp/config/app.js');

// Tasks
const clear = require('./gulp/task/clear.js');
const html = require('./gulp/task/html.js');
const scss = require('./gulp/task/scss.js');
const js = require('./gulp/task/js.js');
const img = require('./gulp/task/img.js');
const font = require('./gulp/task/font.js');
const files = require('./gulp/task/files.js');

// Server
const server = () => {
  browserSync.init({
    server: {
      // baseDir: "./public"
      baseDir: path.root
    }
  })
}

// Наблюдение HTML
const watcher = () => {
  watch(path.html.watch, html).on("all", browserSync.reload);
  watch(path.scss.watch, scss).on("all", browserSync.reload);
  watch(path.js.watch, js).on("all", browserSync.reload);
  watch(path.img.watch, img).on("all", browserSync.reload);
  watch(path.font.watch, font).on("all", browserSync.reload);
  watch(path.files.watch, files).on("all", browserSync.reload);
}

// Наблюдение
const watcher2 = () => {
  watch("./src/html/**/*.html", html);
}

const build = series(
  clear,
  parallel(html, scss, js, img, font, files)
)

const dev = series(
  build,
  parallel(watcher, server)
);

// Задачи
module.exports.html = html;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.font = font;
exports.files = files;

exports.watch = watcher;
exports.clear = clear;

// Сборка
exports.default = app.isProd ? build : dev;
