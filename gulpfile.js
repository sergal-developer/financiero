var config = require('./server/config/config.js'),
    gulp = require('gulp'),
    gls = require('gulp-live-server'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    os = require('os'),
    fs = require('fs'),
    runSequence = require('gulp-run-sequence');

var browser = os.platform() === 'linux' ? 'google-chrome' : (
os.platform() === 'darwin' ? 'google chrome' : (
os.platform() === 'win32' ? 'chrome' : 'firefox'));

gulp.task('compile-sass',() => {
    return gulp.src('app/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat(config.server.cssConcatenated))
        .pipe(gulp.dest(config.server.gulpbuildPath));
});

gulp.task('open-browser', () => {
    var options = {
      uri: `localhost:${config.server.port}`,
      app: browser
    };

    return gulp.src(`localhost:${config.server.port}`)
            .pipe(open(options));
});

gulp.task('server', ['compile-sass'], () => {
    // Generic watch tasks for SASS and Browserify
    // gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/**/*.scss',  ['compile-sass']);
    // gulp.watch('app/**/*.js',  ['scripts']);
  
    // Start the app server.
    var server = gls(config.server.serverFile, 
        { stdio : 'inherit' });
    server.start();
  
    // Reload server when backend files change.
    gulp.watch([ 'server/**/*.js' ], function() {
      server.start.bind(server)();
    });
  
    // Notify server when frontend files change.
    gulp.watch([ 'app/**/*.{scss}' ], function(file) {
      server.notify(file);
    });
});

gulp.task('develop', ['server']);

