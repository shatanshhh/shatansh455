var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var copy = require('gulp-copy');
var connect = require('gulp-connect');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var utils = require('./utils');

gulp.task('clean', function () {
  del.sync('dist/**/*');
})

gulp.task('sass', function () {
    gulp.src(['src/scss/froala_blocks.scss'])
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
});

gulp.task('html', function () {
  gulp.src(['src/html/**/*.html'])
      .pipe(gulp.dest('dist'))
})

gulp.task('imgs', function () {
  gulp.src(['src/imgs/**/*'])
      .pipe(gulp.dest('dist/imgs'))
})

gulp.task('watch', [], function() {
  watch('dist').pipe(connect.reload());
  watch('src/html', function () {
    gulp.start(['html']);
  })
  watch('src/imgs', function () {
    gulp.start(['imgs']);
  })
  watch('src/scss', function () {
    gulp.start(['sass']);
  });
})

gulp.task('connect', function () {
    connect.server({
        root: ['dist', 'node_modules', 'screenshots'],
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

gulp.task('build', ['clean', 'html', 'imgs', 'sass']);

gulp.task('default', ['clean', 'html', 'imgs', 'sass', 'connect', 'watch'], function () {
});