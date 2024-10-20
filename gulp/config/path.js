const pathSrc = "./src";
const pathDest = "./docs";

module.exports = {
  root: pathDest,

  html: {
    src: pathSrc + "/html/*.html",
    watch: pathSrc + "/html/**/*.html",
    dest: pathDest
  },
  
  css: {
    src: pathSrc + "/css/*.css",
    watch: pathSrc + "/css/**/*.css",
    dest: pathDest + "/css"
  },

  scss: {
    src: pathSrc + "/scss/*.scss",
    watch: pathSrc + "/scss/**/*.scss",
    dest: pathDest + "/css"
  },

  js: {
    src: pathSrc + "/js/*.js",
    watch: pathSrc + "/js/**/*.js",
    dest: pathDest + "/js"
  },

  img: {
    src: pathSrc + "/img/**/*.{png,jpg,jpeg,gif,svg,ico}",
    watch: pathSrc + "/img/**/*.{png,jpg,jpeg,gif,svg,ico}",
    dest: pathDest + "/img"
  },

  font: {
    src: pathSrc + "/fonts/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}",
    watch: pathSrc + "/fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}",
    dest: pathDest + "/fonts"
  },

  files: {
    src: pathSrc + "/files/**/*.*",
    watch: pathSrc + "/files/**/*.*",
    dest: pathDest + "/files"
  }
}