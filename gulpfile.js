var gulp = require('gulp'),
    config = require('./server/config/config.js'),
    browserSync = require('browser-sync'),
    server = require('gulp-express'),
    nodemon = require('gulp-nodemon'),
    sass = require('gulp-sass'),
    runSequence = require('gulp-run-sequence'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    open = require('gulp-open'),
    spawn = require('child_process').spawn,
    node;

gulp.task('server',() => {
    if (node) node.kill()
    node = spawn('node', 'server/**/*.js', { stdio: 'inherit' })
    node.on('close',(code) => {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
})

gulp.task('advanced-sass',() => {
    gulp.src('app/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat(config.server.cssConcatenated))
        .pipe(gulp.dest(config.server.gulpbuildPath));
});

gulp.task('build',() => {
    runSequence('advanced-sass');
});

gulp.task('watchers-design',() => {
    gulp.watch('app/**/*.scss', ['advanced-sass']);
});

gulp.task('browser-sync',() => {
    var files = [
        'app/**/*.html',
        'app/**/*.css',
        'app/**/*.js',
        '!app/**/*.spec.js',
        'app/**/*.scss',
    ];
    browserSync.init(null, {
        proxy: "http://localhost:" + config.server.aplicationStart,
        files: files,
        // browser: "Google Chrome",
        browser: "chrome",
        port: config.server.browserSyncPort,
        open: true,
    });
});

gulp.task('browser-sync-api',() => {
    var files = [
        'app/**/*.html',
        'app/**/*.css',
        'app/**/*.js',
        '!app/**/*.spec.js',
        'app/**/*.scss',
    ];
    browserSync.init(null, {
        proxy: "http://localhost:" + config.server.aplicationStart + "/data",
        files: files,
        // browser: "Google Chrome",
        browser: "chrome",
        port: config.server.browserSyncPort,
        open: true,
    });
});

gulp.task('develop',() => {
    runSequence('build', 'watchers-design', 'browser-sync');
    //server.run(['server/server.js']);
    nodemon({
        script: 'server/server.js'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
    })
});

gulp.task('develop-s',() => {
    runSequence('build', 'watchers-design');
    server.run(['server/server.js']);
});

gulp.task('api',() => {
    runSequence('browser-sync-api');
    // server.run(['server/server.js']);
    nodemon({
        script: 'server/server.js'
        , env: { 'NODE_ENV': 'development' }
    })
});


gulp.task('default', ['develop']);