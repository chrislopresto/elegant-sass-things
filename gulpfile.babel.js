import gulp from 'gulp';
import sass from 'gulp-sass';
import connect from 'gulp-connect';
import autoprefixer from 'gulp-autoprefixer';
import config from './config';

export function compileLibrarySassStep() {
  return gulp.src(config.librarySass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulp.dest(config.librarySass.dest));
}

export function watchLibrarySassStep(done) {
  gulp.watch(config.librarySass.watch).on('change', compileLibrarySassStep);
  done();
}

export function compileDemoSassStep() {
  return gulp.src(config.demoSass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulp.dest(config.demoSass.dest));
}

export function watchDemoSassStep(done) {
  gulp.watch(config.demoSass.watch).on('change', compileDemoSassStep);
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

const compileLibrarySass = () => compileLibrarySassStep();
const compileDemoSass = () => compileDemoSassStep();
const watchLibrarySass = (done) => watchLibrarySassStep(done);
const watchDemoSass = (done) => watchDemoSassStep(done);
const watchLiveReloadServer = (done) => watchServer(done);
const connectLiveReloadServer = (done) => connectServer(done);

const build = gulp.series(
  gulp.parallel(
    compileLibrarySass,
    compileDemoSass,
    watchLibrarySass,
    watchDemoSass,
    watchLiveReloadServer,
    connectLiveReloadServer
  )
);

export default build;
