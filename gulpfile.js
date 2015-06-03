"use strict";

var gulp = require('gulp');
var tsc = require('gulp-typescript');
var coveralls = require('gulp-coveralls');
var karma = require('karma').server;
var assign = Object.assign || require('object-assign');

var PATH_TS = 'src/xtorage.ts';
var PATH_ES5_DIST_FOLDER = 'dist/es5/';
var PATH_ES6_DIST_FOLDER = 'dist/es6/';
var PATH_COMMONJS_DIST_FOLDER = 'dist/commonjs/';
var PATH_AMD_DIST_FOLDER = 'dist/amd/';
var PATH_SYSTEM_DIST_FOLDER = 'dist/system/';
var FILE_COVERAGE = 'coverage/**/*.lcov';

var _buildTsc = function(opts) {

    var _opts = assign({typescrit: require('typescript')}, opts);

    gulp
        .src(PATH_TS)
        .pipe(tsc(_opts))
        .js
        .pipe(gulp.dest(_opts.dest))
}

gulp.task('transpile-local', function() {
    _buildTsc({
        tsc: {
            declarationFiles: true,
            declaration: true,
            target: "es5"
        },
        dest: "."});
})

gulp.task('build', ['transpile-local', 'test'], function() {
    _buildTsc({
        tsc: {
            declarationFiles: true,
            module: "commonjs",
            target: "es6"
        },
        dest: PATH_ES6_DIST_FOLDER});

    _buildTsc({
        tsc: {
            declarationFiles: true,
            module: "commonjs",
            target: "es5"
        },
        dest: PATH_ES5_DIST_FOLDER});

    _buildTsc({
        tsc: {
            declarationFiles: true,
            target: "es5",
            module: "amd"
        },
        dest: PATH_AMD_DIST_FOLDER});

    _buildTsc({
        tsc: {
            declarationFiles: true,
            target: "es5",
            module: "commonjs"
        },
        dest: PATH_COMMONJS_DIST_FOLDER});
});

gulp.task('test', ['transpile-local'], function(done) {
    return karma.start({
            configFile: __dirname + '/karma.conf.js',
            browsers: ['PhantomJS'],
            singleRun: true
    }, done);
});

gulp.task('coveralls', ['test'], function() {
    return gulp
            .src(FILE_COVERAGE)
            .pipe(coveralls());
});
