"use strict";

const {src, dest, watch} = require("gulp");
const sass               = require("gulp-sass");
const pug                = require("gulp-pug");
const {stream, init}     = require("browser-sync").create();

// Swallow errors
function swallowError(error) {
  // If you want details of the error in the console
  console.log(error.toString());
  any.emit("end");
}

// Default serve
function serve() {
  // Create BrowserSync stream from main
  init({
    server: {
        baseDir: "main"
    }
  });
}

// Compile Sass
function compileSass() {
  return src(["src/sass/style.sass"])
  .pipe(sass({
    // For development
    outputStyle: "expanded",
  }))
  .on("error", swallowError)
  .pipe(dest("main"))
  .pipe(stream());
}

// Compile Pug
function compilePug() {
  return src(["src/pug_main/*.pug"])
  .pipe(pug({
    // For development
    pretty: true,
  }))
  .on("error", swallowError)
  .pipe(dest("main"))
  .pipe(stream());
}

// Refresh on JS save
function compileJs() {
  return src(["src/js/*.js"])
  .pipe(dest("main"))
  .pipe(stream());
}

watch(["src/sass/*.sass"], compileSass);
watch(["src/**/*.pug"], compilePug);
watch(["src/js/*.js"], compileJs);

exports.default = serve;