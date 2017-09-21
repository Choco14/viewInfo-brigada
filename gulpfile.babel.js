import gulp from 'gulp';
import sass from 'gulp-sass';
import gutil from 'gulp-util';
import babelify from 'babelify';
import jshint from 'gulp-jshint';
import browserify from 'browserify';
import stylish from 'jshint-stylish';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';

const SCRIPTS_DIR = 'resources/assets/js';
const STYLES_DIR = 'resources/assets/sass';

/**
 * Handle error reporting
 * @param  object error
 */
function handleError(error) {
  gutil.log(gutil.colors.red('Error: ' + error.message));
  this.emit('end');
}

// Lint javascript files
gulp.task('lint', () => {
  return gulp.src(SCRIPTS_DIR+'/**/*.js')
    .pipe(jshint({'esnext': true}))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

// Compile node modules for use in the browser
gulp.task('browserify', () => {
  return browserify(SCRIPTS_DIR+'/app.js')
    .transform(babelify, { stage: 0 })
    .bundle().on('error', handleError)
    .pipe(source('app.js'))
    .pipe(gulp.dest('./public/js'));
});

// Compile SASS and add vendor prefixes
gulp.task('sass', () => {
  return gulp.src(STYLES_DIR+'/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', handleError))
    .pipe(autoprefixer('last 10 versions'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'));
});

// Watch files for changes
gulp.task('watch', ['lint', 'browserify', 'sass'], () => {
  gulp.watch(SCRIPTS_DIR+'/**/*.js', ['lint', 'browserify']);
  gulp.watch(STYLES_DIR+'/**/*.scss', ['sass']);
});

// Default gulp task
gulp.task('default', ['watch']);
