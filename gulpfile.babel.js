const gulp = require('gulp');
const path = require('path');
const del = require('del');
const babel = require('gulp-babel');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins();

const paths = {
  js: ['./**/*.js', '!dist/**', '!node_modules/**', '!coverage/**', '!./server/docs/**'],
  nonJs: ['./package.json', './.gitignore', './.env', './server/**/static/**'],
  prodNonJs: ['./package.json', './server/**/static/**'],
  docs: ['./server/docs/**'],
  tests: './server/tests/*.js'
};

function clean() {
  return del(['dist/**', 'dist/.*', 'coverage/**', '!dist', '!coverage']);
}

function copy() {
  return gulp.src(paths.nonJs)
    .pipe(plugins.newer('dist'))
    .pipe(gulp.dest('dist'))
}

function deployCopy() {
  return gulp.src(paths.prodNonJs)
    .pipe(plugins.newer('dist'))
    .pipe(gulp.dest('dist'))
}

function babelTask(done) {
  return gulp.src([...paths.js, '!gulpfile.babel.js'], { base: '.'})
    .pipe(plugins.newer('dist'))
    .pipe(plugins.sourcemaps.init())
    .pipe(babel())
    .pipe(plugins.sourcemaps.write('.', {
      includeContent: false,
      sourceRoot(file) {
        return path.relative(file.path, __dirname);
      }
    }))
    .pipe(gulp.dest("dist"));
}

function nodemon(done) {
  plugins.nodemon({
    script: path.join('dist', 'index.js'),
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
    tasks: ['copy', 'babelTask'],
    done: done
  })
}

gulp.task('clean', clean);
gulp.task('copy', copy);
gulp.task('deployCopy', deployCopy);
gulp.task('babelTask', babelTask);
gulp.task('serve', gulp.series(clean, copy, nodemon));
gulp.task('default', gulp.series(clean, copy, babelTask));
gulp.task('deployBuild', gulp.series(clean, deployCopy, babelTask));

