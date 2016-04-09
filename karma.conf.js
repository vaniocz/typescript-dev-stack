var webpack = require('webpack');
var testConfig = require('./webpack.config-test');

module.exports = function (config) {
    config.set({
        frameworks: ['mocha', 'source-map-support', 'detectBrowsers'],
        browsers: ['PhantomJS'],
        detectBrowsers: {enabled: false},
        singleRun: true,
        files: ['tests/client.js'],
        preprocessors: {
            'tests/client.js': ['webpack', 'sourcemap']
        },
        reporters: ['mocha'],
        webpack: testConfig,
        client: {
            mocha: {
                reporter: 'html'
            }
        },
        webpackMiddleware: {
            noInfo: true,
            stats: {
                colors: true
            }
        }
    });
};
