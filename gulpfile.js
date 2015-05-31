"use strict";

const gulp = require('gulp');
const tsc = require('gulp-typescript');
const coveralls = require('gulp-coveralls');
const karma = require('karma').server;

const PATH_TS = 'src/xtorage.ts';
const PATH_ES5_DIST_FOLDER = 'dist/es5/';
const PATH_ES6_DIST_FOLDER = 'dist/es6/';
const PATH_COMMONJS_DIST_FOLDER = 'dist/commonjs/';
const PATH_AMD_DIST_FOLDER = 'dist/amd/';
const PATH_SYSTEM_DIST_FOLDER = 'dist/system/';
const FILE_COVERAGE = 'coverage/**/*.lcov';

gulp.task('build', ['test'], function() {
    gulp
        .src(PATH_TS)
        .pipe(tsc({
            declarationFiles: true,
            target: "es6"
        }))
        .js
        .pipe(gulp.dest(PATH_ES6_DIST_FOLDER));
});

gulp.task('test', function(done) {
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
