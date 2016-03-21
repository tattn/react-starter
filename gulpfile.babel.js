import gulp from 'gulp'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import webserver from 'gulp-webserver'
import nodemon from 'gulp-nodemon'
import babel from 'gulp-babel'

gulp.task('browserify', () => {
  browserify('./src/client.js', { debug: true })
    .transform(babelify)
    .bundle()
    .on("error", (err) => { console.log(`Error : ${err.message}`); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/js/'))
});

gulp.task('watch', () => {
  gulp.watch('./src/**/*.js', ['browserify'])
});

// gulp.task('webserver', () => {
//   gulp.src('./')
//     .pipe(webserver({
//       host: '127.0.0.1',
//       livereload: true
//     })
//   );
// });

gulp.task('server', () => {
  nodemon({
    script: './src/server.js',
    ext: 'js',
    execMap: {
      "js": "./node_modules/.bin/babel-node"
    },
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('default', ['browserify', 'watch', 'server']);