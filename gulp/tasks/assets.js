import gulp from 'gulp';
import conf from '../gulpconfig.js';



export function assets() {
  const source = conf.path.assets;
  return gulp.src(source)
    .pipe(gulp.dest(conf.dest.distAssets))
}


export function assetsDev() {
  const source = conf.path.assets;
  return gulp.src(source)
    .pipe(conf.require.changed(source))
    .pipe(gulp.dest(conf.dest.publicAssets))
    .pipe(conf.require.browsersync.stream());
}