"use strict";

var gulp = require('gulp');
var tsc = require('gulp-typescript');
var coveralls = require('gulp-coveralls');
var karma = require('karma').server;
var assign = Object.assign || require('object-assign');

var MAIN_FILE_NAME = 'xtorage.js';
var DEFINITION_FILE = 'xtorage.d.ts';
var SRC_FOLDER = './src/';
var TEST_FOLDER = './test/';
var PATH_TS = 'src/xtorage.ts';
var PATH_TS_TEST = 'src/xtorage_test.ts';
var PATH_COMMONJS_DIST_FOLDER = 'dist/commonjs/';
var FILE_COVERAGE = 'coverage/**/*.lcov';

var _buildTsc = function(opts, path) {
    var _dest = opts.dest;
    var _opts = assign({
        typescrit: require('typescript'),
        declaration: true,
        target: "es5"
    }, opts.tsc);

    return gulp
        .src(path || PATH_TS)
        .pipe(tsc(_opts))
        .js
        .pipe(gulp.dest(_dest));
}

gulp.task('transpile', ['transpile-local-src', 'transpile-local-test']);

gulp.task('transpile-local-src', function() {
    return _buildTsc({
        tsc: {
            declarationFiles: true,
            declaration: true,
            target: "es5",
            module: "commonjs"
        },
        dest: SRC_FOLDER});
});

gulp.task('transpile-local-test', function() {
    return _buildTsc({
        tsc: {module: "commonjs"},
        dest: TEST_FOLDER}, PATH_TS_TEST);
});

gulp.task('copy-definitions', function() {
  return gulp.src(SRC_FOLDER + DEFINITION_FILE)
             .pipe(gulp.dest(PATH_COMMONJS_DIST_FOLDER));
});

gulp.task('build', ['transpile-local-src', 'test', 'copy-definitions'], function() {

    return _buildTsc({
        tsc: {module: "commonjs"},
        dest: PATH_COMMONJS_DIST_FOLDER});
});

gulp.task('test', ['transpile-local-src', 'transpile-local-test'], function(done) {
    return karma.start({
            configFile: __dirname + '/karma.conf.js',
            browsers: ['PhantomJS'],
            singleRun: true
    }, done);
});

gulp.task('test-watch', ['transpile-local-src', 'transpile-local-test'], function(done) {
    return karma.start({
            configFile: __dirname + '/karma.conf.js',
            browsers: ['PhantomJS'],
            singleRun: false
    }, done);
});

gulp.task('coveralls', ['test'], function() {
    return gulp
            .src(FILE_COVERAGE)
            .pipe(coveralls());
});
