var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('connect', function(){
  connect.server({
    root: 'docs',
    livereload: true,
    port: 8888
  });
});

gulp.task('sass', function () {
  return gulp.src('./elegant-sass-things.scss')
      .pipe(sass({ errLogToConsole: true }))
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(gulp.dest('./docs/css'));
});

gulp.task('demo-sass', function () {
  return gulp.src('./demo/demo.scss')
      .pipe(sass({ errLogToConsole: true }))
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(gulp.dest('./docs/css'));
});

gulp.task('livereload', function (){
  gulp.src('./docs/**/*')
  .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('./elegant-sass-things/**/*.scss', ['sass']);
  gulp.watch('./elegant-sass-things.scss', ['sass']);
  gulp.watch('./demo/demo.scss', ['demo-sass']);
  gulp.watch('./docs/**/*', ['livereload']);
});

gulp.task('default', ['connect', 'watch', 'sass', 'demo-sass']);
