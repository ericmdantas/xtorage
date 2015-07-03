"use strict";

var gulp = require('gulp');
var tsc = require('gulp-typescript');
var coveralls = require('gulp-coveralls');
var karma = require('karma').server;
var assign = Object.assign || require('object-assign');

var MAIN_FILE_NAME = 'xtorage.js';
var SRC_FOLDER = './src/';
var TEST_FOLDER = './test/';
var PATH_TS = 'src/xtorage.ts';
var PATH_TS_TEST = 'test/xtorage_test.ts';
var PATH_ES5_DIST_FOLDER = 'dist/es5/';
var PATH_ES6_DIST_FOLDER = 'dist/es6/';
var PATH_COMMONJS_DIST_FOLDER = 'dist/commonjs/';
var PATH_AMD_DIST_FOLDER = 'dist/amd/';
var PATH_SYSTEM_DIST_FOLDER = 'dist/system/';
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

var _buildSystemJS = function() {
    var Builder = require('systemjs-builder');

    var buildConfig = {
        defaultJSExtensions: true,
        baseUrl: PATH_COMMONJS_DIST_FOLDER
    };

    var builder = new Builder(buildConfig);

    return builder
            .build(PATH_COMMONJS_DIST_FOLDER + MAIN_FILE_NAME, PATH_SYSTEM_DIST_FOLDER + MAIN_FILE_NAME)
            .then(function() {
                console.log('success')
            })
            .catch(function(error) {
                console.log('error');
                console.log(error);
            })
}

gulp.task('transpile-local-src', function() {
    return _buildTsc({
        tsc: {
            declarationFiles: true,
            declaration: true,
            target: "es5",
            module: "amd"
        },
        dest: SRC_FOLDER});
});

gulp.task('transpile-local-test', function() {
    return _buildTsc({
        tsc: {module: "amd"},
        dest: TEST_FOLDER}, PATH_TS_TEST);
});

//gulp.task('build', ['transpile-local-src', 'test'], function() {
//TODO: remove comment above when karma is running just find with karma
gulp.task('build', ['transpile-local-src'], function() {
    _buildTsc({
        tsc: {target: "es6", module: "commonjs"},
        dest: PATH_ES6_DIST_FOLDER});

    _buildTsc({
        tsc: {module: "amd"},
        dest: PATH_ES5_DIST_FOLDER});

    _buildTsc({
        tsc: {module: "amd"},
        dest: PATH_AMD_DIST_FOLDER});

    _buildTsc({
        tsc: {module: "commonjs"},
        dest: PATH_COMMONJS_DIST_FOLDER})
        .on('end', function() {
            return _buildSystemJS();
        });

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
