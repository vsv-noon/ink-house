const isProd = process.argv.includes("--production");
const isDev = !isProd;

module.exports = {
  isProd: isProd,
  isDev: isDev,

  htmlmin: {
    collapseWhitespace: isProd
  },  

  imagemin: {
    verbose: true
  },

  fonter: {
    formats: ["ttf", "eot", "woff", "svg", "otf"]
  }
}