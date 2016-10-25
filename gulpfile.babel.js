import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import connect from 'gulp-connect';
import autoprefixer from 'gulp-autoprefixer';
import gls from 'gulp-live-server';
import gulpWebpack from 'gulp-webpack';
import webpack from 'webpack';
import config from './config';
import webpackConfig from './webpack.config';

export function compileLibrarySass() {
  return gulp.src(config.librarySass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulp.dest(config.librarySass.dest));
}

export function watchLibrarySass(done) {
  gulp.watch(config.librarySass.watch).on('change', compileLibrarySass);
  done();
}

export function compileDemoSass() {
  return gulp.src(config.demoSass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulp.dest(config.demoSass.dest));
}

export function watchDemoSass(done) {
  gulp.watch(config.demoSass.watch).on('change', compileDemoSass);
  done();
}

export function connectServer(done) {
  connect.server({
    livereload: config.server.liveReload,
    root: config.server.root,
    port: config.server.port
  });
  done();
}

export function reloadServer() {
  return gulp.src(config.server.src)
    .pipe(connect.reload());
}

export function watchServer(done) {
  gulp.watch(config.server.watch).on('change', reloadServer);
  done();
}

const server = gls([config.jsServer.script], {}, false);

export function transpileJsServer() {
  return gulp.src(config.jsServer.transpile.src)
    .pipe(babel())
    .pipe(gulp.dest(config.jsServer.transpile.dest))
}

export function startJsServer(done) {
  server.start();
  done();
}

export function watchJsServer(done) {
  gulp.watch(config.jsServer.watch).on('change', gulp.series(transpileJsServer, startJsServer, getJsServerOutput));
  done();
}

export function getJsServerOutput() {
  return gulp.src(config.jsServer.src)
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(config.jsServer.dest));
}

const build = gulp.series(
  transpileJsServer,
  startJsServer,
  getJsServerOutput,
  gulp.parallel(
    compileLibrarySass,
    compileDemoSass,
    watchLibrarySass,
    watchDemoSass,
    watchServer,
    watchJsServer,
    connectServer
  )
);

export default build;
