// Get Gulp packages
var gulp = require('gulp');

// Packages Declaration
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var browserSync = require('browser-sync').create();

// Gulp Default tasks
gulp.task('default', ['check', 'clean', 'sass', 'scripts', 'browser-sync', 'watch']);

// Gulp Watch function
gulp.task('watch', function() {
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('*.html').on('change', browserSync.reload);
})

// SASS Compile + Minify
gulp.task('sass', function() {
  return gulp.src(
    [
    'bower_components/bootstrap-grid-only/css/grid24.css',
    'bower_components/components-font-awesome/css/font-awesome.min.css',
    'scss/*.scss'
    ])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', gutil.log))
    .pipe(cleancss())
    .pipe(concat('app.css'))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream: true}))
});
// Concat + Minify .js
gulp.task('scripts', function() {
    return gulp.src(
      ['bower_components/jquery/dist/jquery.min.js',
      'bower_components/chartist/dist/chartist.min.js',
      'js/*.js'
      ])
      .pipe(sourcemaps.init())
      .pipe(uglify().on('error', gutil.log))
      .pipe(concat('app.js'))
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.reload({stream: true}))
});
// Clear build folder
gulp.task('clean', function() {
    return del.sync(['dist/*']);
});
// browser-sync server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
// Gulp run test
gulp.task('check', function() {
  console.log('Tasks running..');
});
