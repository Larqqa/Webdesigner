const gulp = require('gulp'),
sass = require('gulp-sass'),
pug = require('gulp-pug'),
browserSync = require('browser-sync').create();

// Swallow errors
function swallowError(error) {

  // If you want details of the error in the console
  console.log(error.toString());

  this.emit('end');
}

// Compile Sass
function compileSass(cb) {
  return gulp.src(['src/sass/*.sass', '!src/sass/functions.sass'])
  .pipe(sass({
    outputStyle: 'expanded',
  }))
  .on('error', swallowError)
  .pipe(gulp.dest('main'))
  .pipe(browserSync.stream());
  cb();
}

// Compile Pug
function compilePug(cb) {
  return gulp.src(['src/index.pug'])
  .pipe(pug())
  .on('error', swallowError)
  .pipe(gulp.dest('main'))
  .pipe(browserSync.stream());
  cb();
}

// Refresh on JS save
function compileJs(cb) {
  return gulp.src(['src/js/*.js'])
  .pipe(gulp.dest('main'))
  .pipe(browserSync.stream());
}

// Default serve
function serve(cb) {
  browserSync.init({
    server: {
        baseDir: "main"
    }
  });
}

gulp.watch(['src/sass/*.sass'], compileSass);
gulp.watch(['src/**/*.pug'], compilePug);
gulp.watch(['src/js/*.js'], compileJs);

exports.default = serve;