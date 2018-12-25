/*
const gulp = require('gulp'),
sass = require('gulp-sass'),
pug = require('gulp-pug'),
browserSync = require('browser-sync').create();

function swallowError(error) {

  // If you want details of the error in the console
  console.log(error.toString());

  this.emit('end');
}

// Compile Sass
gulp.task('sass', function () {
  return gulp.src(['src/sass/*.sass', '!src/sass/functions.sass'])
  .pipe(sass({
    outputStyle: 'expanded',
  }))
  .on('error', swallowError)
  .pipe(gulp.dest('main'))
  .pipe(browserSync.stream());
});

// Compile Pug
gulp.task('pug', function () {
  return gulp.src(['src/index.pug'])
  .pipe(pug())
  .on('error', swallowError)
  .pipe(gulp.dest('main'))
  .pipe(browserSync.stream());
});

// Refresh on js save
gulp.task('js', function () {
  return gulp.src(['src/js/*.js'])
  .pipe(gulp.dest('main'))
  .pipe(browserSync.stream());
});

// Watch & Serve
gulp.task('serve', ['sass'], function () {
  browserSync.init({
      server: {
          baseDir: "main"
      }
  });
*/

  // Watch Sass
//  gulp.watch(['src/sass/*.sass'], ['sass']);
//  gulp.watch(['src/js/*.js'], ['js']);
//  gulp.watch(['src/**/*.pug'], ['pug']);
//  gulp.watch("main/*.html").on('change', browserSync.reload);
//});

// Default
//gulp.task('default', ['serve']);


const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function swallowError(error) {

  // If you want details of the error in the console
  console.log(error.toString());

  this.emit('end');
}

function sass(cb) {
  return gulp.src(['src/sass/*.sass', '!src/sass/functions.sass'])
  .pipe(sass({
    outputStyle: 'expanded',
  }))
  .on('error', swallowError)
  .pipe(gulp.dest('main'))
  .pipe(browserSync.stream());
  cb();
}

function serve(cb) {
  browserSync.init({
    server: {
        baseDir: "main"
    }
  });
}

gulp.watch(['src/sass/*.sass'], sass);
gulp.task('default', ['serve']);