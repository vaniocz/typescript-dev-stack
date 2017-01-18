process.env.TEST = true;

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackConfig = require(path.resolve(__dirname, 'webpack.config'));

module.exports = (config) => {
    const options = {
        frameworks: ['mocha', 'source-map-support', 'detectBrowsers'],
        reporters: ['mocha'],
        browsers: ['Electron'],
        detectBrowsers: {enabled: false},
        singleRun: true,
        files: ['tests/runner.js'],
        preprocessors: {
            'tests/runner.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        client: {
            mocha: {reporter: 'html'}
        },
        webpackMiddleware: {stats: 'errors-only'},
        electronOpts: {show: false},
        plugins: [
            'karma-webpack',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-sourcemap-loader',
            'karma-source-map-support',
            'karma-detect-browsers',
            'karma-coverage',
            'karma-electron-launcher',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-ie-launcher',
            'karma-remap-coverage'
        ]
    };

    if (process.env.COVERAGE) {
        options.reporters.push('coverage', 'remap-coverage');
        options.coverageReporter = {
            type: 'in-memory'
        };
        options.remapCoverageReporter = {
            'text-summary': null,
            lcovonly: path.resolve(__dirname, 'build/coverage/karma/lcov.info'),
            json: path.resolve(__dirname, 'build/coverage/karma/coverage.json'),
            html: path.resolve(__dirname, 'build/coverage/karma/html')
        };

        if (process.env.INTELLIJ_KARMA_REPORTER_COVERAGE) {
            options.preprocessors.__karma_intellij__ = ['coverage'];
            options.coverageReporter.reporters[0].dir = '.tmp/coverage';
            options.remapIstanbulReporter.src = '.tmp/coverage/coverage.json';
            options.remapIstanbulReporter.reports.lcovonly = '.tmp/coverage/lcov.info';
            delete options.coverageReporter.reporters[1];
            delete options.remapIstanbulReporter.reports.html;
        }
    }

    config.set(options);
};
