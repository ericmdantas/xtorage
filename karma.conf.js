module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'jasmine'],
    files: [
      'build/xtorage.js',
      'build/xtorage_test.js'
    ],
    preprocessors: {
      'build/xtorage.js': ['browserify', 'coverage'],
      'build/xtorage_test.js': ['browserify']
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
	browserify: {
		transform: [
			'babelify'
		]
	},
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true
  });
};
