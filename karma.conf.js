var webpack = require('webpack');
var testConfig = require('./webpack.config-test');

module.exports = function (config) {
    config.set({
        browsers: ['Chrome', 'Firefox', 'PhantomJS'],
        singleRun: true,
        frameworks: ['mocha'],
        files: ['tests.webpack.js'],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap']
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
