process.env.TEST = true;

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

module.exports = (config) => {
    const options = {
        frameworks: ['mocha', 'source-map-support', 'detectBrowsers'],
        reporters: ['mocha'],
        browsers: ['Electron'],
        detectBrowsers: {enabled: false},
        singleRun: true,
        files: ['tests/runner.js'],
        preprocessors: {
            'tests/runner.js': ['webpack'],
        },
        webpack: webpackConfig,
        client: {
            mocha: {reporter: 'html'},
        },
        webpackMiddleware: {stats: 'errors-only'},
        electronOpts: {show: false},
        plugins: [
            'karma-webpack',
            'karma-source-map-support',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-detect-browsers',
            'karma-coverage',
            'karma-remap-coverage',
            'karma-electron-launcher',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-ie-launcher',
        ]
    };

    if (process.env.COVERAGE) {
        options.reporters.push('coverage', 'remap-coverage');
        options.coverageReporter = {type: 'in-memory'};
        options.remapCoverageReporter = {
            'text-summary': null,
            lcovonly: path.resolve(__dirname, 'build/coverage/karma/lcov.info'),
            html: path.resolve(__dirname, 'build/coverage/karma/html'),
        };
    }

    if (process.env.INTELLIJ_KARMA_REPORTER_COVERAGE) {
        options.remapCoverageReporter = {lcovonly: '.tmp/intellij-coverage/0remapped/lcov.info'};
    }

    config.set(options);
};
