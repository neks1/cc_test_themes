'use strict';
var gulp             = require('gulp');
var sass             = require('gulp-sass');
var plumber          = require('gulp-plumber');
var sassGlob         = require('gulp-sass-glob');
var stripCssComments = require('gulp-strip-css-comments');
var browserSync      = require('browser-sync').create();

var cssmin           = require('gulp-cssmin');
var rename           = require('gulp-rename');
var jsmin            = require('gulp-jsmin');
var concat           = require('gulp-concat');

var cssFiles = [
  './bower_components/fullpage.js/dist/jquery.fullpage.css',
  './bower_components/slicknav/dist/slicknav.min.css',
  './stylesheets/styles.css'
];

var jsFiles = [
  './bower_components/fullpage.js/dist/jquery.fullpage.js',
  './bower_components/slicknav/dist/jquery.slicknav.min.js',
  './bower_components/slick-carousel/slick/slick.js',
  './js/main.js'
];

/* Min CSS */
gulp.task('css_min',['sass'], function () {
  gulp.src([
    './bower_components/fullpage.js/dist/jquery.fullpage.min.css',
    './stylesheets/style.css'])
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./dist'))
    .pipe(cssmin({path: './dist/main.css'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist'));
});

/* Min JS */
gulp.task('js_min', function () {
  gulp.src([
    './bower_components/slick-carousel/slick/slick.js',
    './bower_components/fullpage.js/dist/jquery.fullpage.min.js',
    'js/custom.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(jsmin({path: './dist/main.js'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist'))
});

/* CSS concat*/
gulp.task('css_concat', ['sass'], function () {
  gulp.src([
    './bower_components/fullpage.js/dist/jquery.fullpage.min.css',
    './stylesheets/style.css'])
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./dist'));
});

/* JS concat */
gulp.task('js_concat', function () {
  gulp.src([
    './bower_components/slick-carousel/slick/slick.js',
    './bower_components/fullpage.js/dist/jquery.fullpage.min.js',
    'js/custom.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist'));
});

/* Browser sync*/
gulp.task('sass', function () {
  return gulp.src(['./sass/**/*.s*ss'])
    .pipe(plumber(({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    })))
    .pipe(sassGlob())
    .pipe(stripCssComments())
    .pipe(sass({
      style: 'expanded',
      sourceComments: 'map',
      sourceMap: 'sass',
      outputStyle: 'nested',
    }))
    .pipe(sass.sync())
    .pipe(gulp.dest('./stylesheets'))
    .pipe(concat({ path: 'main.css'}))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

/* Watch */
gulp.task('watch', ['css_concat', 'js_concat'], function() {
  gulp.watch('./sass/**/*.s*ss', ['css_concat']);
  gulp.watch('./stylesheets/style.css').on('change', browserSync.reload);
  gulp.watch('./js/*.js', ['js_concat']).on('change', browserSync.reload);
});

/* Default task */
gulp.task('default', ['watch']);

/* Live task */
gulp.task('live', ['css_min', 'js_min']);
