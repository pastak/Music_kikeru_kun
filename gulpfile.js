const gulp = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const plumber = require('gulp-plumber')
const browserify = require('browserify')
const watchify = require('watchify')
const source = require('vinyl-source-stream')
const sourcemaps = require('gulp-sourcemaps')
var watching = false

gulp.task('sass', () => {
  return gulp.src('./client/css/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(concat('application.css'))
    .pipe(gulp.dest('public/css'));
})

gulp.task('build-client', () => {
  var opts = {
    entries: ['./client/js/index.js'],
    debug: true
  }
  if (watching) {
    var b = watchify(browserify(opts))
  } else {
    var b = browserify(opts)
  }
  return b.transform('babelify')
  .bundle()
  .pipe(plumber())
  .pipe(source('client.js'))
  .pipe(gulp.dest('public/js'))
})

gulp.task('build-server', () => {
  return gulp.src('app/**/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('dist/app'))
})

gulp.task('build', ['build-server', 'build-client', 'sass'])

gulp.task('enable-watch-mode', () => { watching = true })
gulp.task('watch', ['enable-watch-mode','build-server', 'build-client','sass'], () => {
  gulp.watch('client/**/*.js', ['build-client'])
  gulp.watch('client/**/*.scss', ['sass'])
  gulp.watch('app/**/*.js', ['build-server'])
})

gulp.task('default', ['build'])
