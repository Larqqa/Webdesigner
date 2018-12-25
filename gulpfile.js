const gulp = require('gulp'),
sass = require('gulp-sass'),
jade = require('gulp-jade'),
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

/*
// Compile Jade
gulp.task('jade', function () {
  return gulp.src(['src/jade/*.jade'])
  .pipe(jade())
  .on('error', swallowError)
  .pipe(gulp.dest('src/html'))
  .pipe(browserSync.stream());
});
*/
gulp.task('jade', function () {
  return gulp.src(['src/index.jade'])
  .pipe(jade())
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

  // Watch Sass
  gulp.watch(['src/sass/*.sass'], ['sass']);
  gulp.watch(['src/js/*.js'], ['js']);
  //gulp.watch(['src/jade/*.jade'], ['jade']);
  //gulp.watch(['src/jade/includes/*.jade'], ['jade']);
  gulp.watch(['src/**/*.jade'], ['jade']);
  gulp.watch("main/*.html").on('change', browserSync.reload);
});

// Default
gulp.task('default', ['serve']);
