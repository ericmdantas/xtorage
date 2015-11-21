import gulp from 'gulp';
import tsc from 'gulp-typescript';
import coveralls from 'gulp-coveralls';
import {server as karma} from 'karma'
const assign = Object.assign || require('object-assign');

const MAIN_FILE_NAME = 'xtorage.js';
const DEFINITION_FILE = 'xtorage.d.ts';
const SRC_FOLDER = './src/';
const TEST_FOLDER = './src/';
const PATH_TS = 'src/xtorage.ts';
const PATH_TS_TEST = 'src/xtorage_test.ts';
const PATH_COMMONJS_DIST_FOLDER = 'dist/commonjs/';
const PATH_SYSTEM_DIST_FOLDER = 'dist/system/';
const PATH_ES6_DIST_FOLDER = 'dist/es6/';
const FILE_COVERAGE = 'coverage/**/*.lcov';

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

gulp.task('compile', ['compile:src', 'compile:test']);

gulp.task('compile:src', function() {
    return _buildTsc({
        tsc: {
            declarationFiles: true,
            declaration: true,
            target: "es5",
            module: "commonjs"
        },
        dest: SRC_FOLDER});
});

gulp.task('compile:test', function() {
    return _buildTsc({
        tsc: {module: "commonjs", declaration: false},
        dest: TEST_FOLDER}, PATH_TS_TEST);
});

gulp.task('copy-definitions', function() {
  return gulp.src(SRC_FOLDER + DEFINITION_FILE)
             .pipe(gulp.dest(PATH_COMMONJS_DIST_FOLDER))
             .pipe(gulp.dest(PATH_SYSTEM_DIST_FOLDER));
});

gulp.task('build', ['compile:src', 'test', 'copy-definitions'], function() {

    _buildTsc({
        tsc: {module: "commonjs"},
        dest: PATH_COMMONJS_DIST_FOLDER
    });

    return _buildTsc({
      tsc: {module: "system"},
      dest: PATH_SYSTEM_DIST_FOLDER
    });
});

gulp.task('test', ['compile:src', 'compile:test'], function(done) {
    return karma.start({
            configFile: __dirname + '/karma.conf.js',
            browsers: ['PhantomJS'],
            singleRun: true
    }, done);
});

gulp.task('test-watch', ['compile:src', 'compile:test'], function(done) {
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
