var autoprefixer = require('autoprefixer');
var connect      = require('gulp-connect');
var copy         = require('gulp-copy');
var del          = require('del');
var gulp         = require('gulp');
var postcss      = require('gulp-postcss');
var sass         = require('gulp-sass');
var utils        = require('./utils');
var vinylPaths   = require('vinyl-paths');
var watch        = require('gulp-watch');

var build = function (dest) {
  gulp.task('clean-' + dest, function () {
    del.sync('dist/**/*');
  })

  gulp.task('sass-' + dest, function () {
    gulp.src(['src/scss/froala.scss'])
      .pipe(sass())
      .pipe(postcss([ autoprefixer() ]))
      .pipe(gulp.dest(dest + '/css'))
  });

  gulp.task('html-' + dest, function () {
    gulp.src(['src/html/**/*.html'])
      .pipe(gulp.dest(dest))
  })

  gulp.task('imgs-' + dest, function () {
    gulp.src(['src/imgs/**/*'])
      .pipe(gulp.dest(dest + '/imgs'))
  })
}

build('.tmp');
build('dist');

gulp.task('watch', [], function() {
  watch('dist').pipe(connect.reload());
  watch('src/html', function () {
    gulp.start(['html-.tmp']);
  })
  watch('src/imgs', function () {
    gulp.start(['imgs-.tmp']);
  })
  watch('src/scss', function () {
    gulp.start(['sass-.tmp']);
  });
})

gulp.task('connect', function () {
  connect.server({
    root: ['.tmp', 'node_modules', 'screenshots'],
    port: 8001,
    livereload: true
  });
});

gulp.task('screenshots', function(cb) {
  del.sync('./screenshots');

  utils.makeScreenshots([
    ['call_to_action', 'header, section, footer'],
    ['contacts', 'header, section, footer'],
    ['contents', 'header, section, footer'],
    ['features', 'header, section, footer'],
    ['footers', 'header, section, footer'],
    ['forms', 'header, section, footer'],
    ['headers', 'header, section, footer'],
    ['pricings', 'header, section, footer'],
    ['teams', 'header, section, footer'],
    ['testimonials', 'header, section, footer'],
  ]).then(function() {
    cb();
  });
});

gulp.task('dist', ['clean-dist', 'html-dist', 'imgs-dist', 'sass-dist']);

gulp.task('default', ['clean-.tmp', 'html-.tmp', 'imgs-.tmp', 'sass-.tmp', 'connect', 'watch']);
