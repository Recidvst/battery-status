// Get Gulp packages
var gulp = require('gulp');

// Packages Declaration
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var del = require('del');

// Gulp Default tasks
gulp.task('default', ['check', 'clean', 'sass', 'scripts']);

// Gulp Watch function
gulp.task('watch', function() {
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('js/*.js', ['scripts']);
})

// Task Definitions
// SASS Compile + Minify
gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
    .pipe(sass().on('error', gutil.log))
    .pipe(cleancss())
    .pipe(concat('app.css'))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('dist'))
});
// Concat + Minify .js
gulp.task('scripts', function() {
    return gulp.src(
      ['js/*.js',
      'bower_components/jquery/dist/jquery.min.js'
      ])
      .pipe(uglify().on('error', gutil.log))
      .pipe(concat('app.js'))
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(gulp.dest('dist'))
});
// Clear build folder
gulp.task('clean', function() {
    return del.sync(['dist/*']);
});
// Gulp run test
gulp.task('check', function() {
  console.log('Tasks running..');
});
