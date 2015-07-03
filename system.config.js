// Configure module loader
System.config({
    baseURL: '/',

    // Set paths for third-party libraries as modules
    paths: {
        'babel': 'node_modules/babel-core/browser.js',
        'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js',
        'systemjs': 'node_modules/systemjs/dist/system.js',
        'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js'
    },

    // opt in to Babel for transpiling over Traceur
    transpiler: 'babel'
});