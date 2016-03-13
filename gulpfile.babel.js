import gulp from 'gulp'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import webserver from 'gulp-webserver'

gulp.task('browserify', () => {
  browserify('./app.jsx', { debug: true })
    .transform(babelify)
    .bundle()
    .on("error", (err) => { console.log(`Error : ${err.message}`); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./'))
});

gulp.task('watch', () => {
  gulp.watch('./*.jsx', ['browserify'])
});

gulp.task('webserver', () => {
  gulp.src('./')
    .pipe(webserver({
      host: '127.0.0.1',
      livereload: true
    })
  );
});

gulp.task('default', ['browserify', 'watch', 'webserver']);