process.env.TEST = true;

const fs = require('fs');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const karmaRemapIstanbul = require('remap-istanbul/lib/karmaRemapIstanbul');

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
            karmaRemapIstanbul
        ]
    };

    if (process.env.COVERAGE) {
        options.reporters.push('coverage', 'karma-remap-istanbul');
        options.coverageReporter = {
            dir: 'build/coverage/karma',
            reporters: [{type : 'json', subdir : '.', file : 'coverage.json'}]
        };
        options.remapIstanbulReporter = {
            src: 'build/coverage/karma/coverage.json',
            timeoutNoMoreFiles: 20000,
            reports: {
                lcovonly: 'build/coverage/karma/lcov.info',
                html: 'build/coverage/karma/html',
                'text-summary': false
            }
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
