'use strict';

const path = require('path');
const fs = require('fs');
const minimist = require('minimist');
const webpack = require('webpack');
const OutputIgnorePlugin = require('webpack-output-ignore-plugin');
const SplitByPathPlugin = require('webpack-split-by-path');
const NotifierPlugin = require('webpack-notifier');

const script = process.env.npm_lifecycle_event || '';
const indexHtmlPath = path.resolve(__dirname, 'src/index.html');
const indexScssPath = path.resolve(__dirname, 'src/index.scss');
const config = {
    entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        'index.html': indexHtmlPath,
        'index.css': indexScssPath,
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            sinon: 'sinon/pkg/sinon.js',
        },
    },
    devtool: script === 'build' ? false : 'inline-source-map',
    module: {
        rules: [
            {
                test: indexHtmlPath,
                loaders: 'file-loader?name=[name].html!extract-loader',
            }, {
                test: indexScssPath,
                loaders: 'file-loader?name=[name].css!extract-loader',
            }, {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader',
            }, {
                test: /\.scss$/,
                loader: script === 'build'
                    ? 'css-loader!postcss-loader!sass-loader'
                    : 'css-loader?sourceMap!postcss-loader!sass-loader?sourceMap',
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=fonts/[name].[ext]',
            }, {
                test: /\.html$/,
                loader: 'html-loader?interpolate',
            }, {
                test: require.resolve('sinon/pkg/sinon'),
                loader: 'imports-loader?require=>false!exports-loader?exports!exports-loader?default=this.sinon',
            },
        ],
    },
    plugins: [new OutputIgnorePlugin({include: ['index.html.js', 'index.css.js']})],
    devServer: {
        historyApiFallback: {index: '/index.html'},
        noInfo: true,
    }
};

if (script === 'build') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({comments: false, compress: {warnings: false}}));
} else if (script === 'start') {
    config.plugins.push(new NotifierPlugin({alwaysNotify: true}));
}

setupIntellijKarmaReporter();
process.env.TEST = (
    process.env.TEST
    || process.env.INTELLIJ_KARMA_REPORTER
    || /[/\\](karma|_mocha|mocha-webpack)$/.test(process.argv[1])
) ? 1 : '';
process.env.COVERAGE = (
    process.env.COVERAGE
    || process.env.INTELLIJ_KARMA_REPORTER_COVERAGE
    || script.endsWith(':coverage')
) ? 1 : '';

const argv = minimist(process.argv.slice(2));
const scriptParts = script.split(':');
const testContext = process.env.TEST_CONTEXT || (
    ['browser', 'server', 'native'].indexOf(scriptParts[1]) !== -1
        ? scriptParts[1]
        : /[/\\](_mocha|mocha-webpack)$/.test(process.argv[1]) ? 'server' : ''
);

config.plugins.push(new webpack.DefinePlugin({
    __PRODUCTION__: JSON.stringify(script === 'build'),
    __DEVELOPMENT__: JSON.stringify(script !== 'build' && !process.env.TEST),
    __TEST__: JSON.stringify(process.env.TEST),
    __COVERAGE__: JSON.stringify(process.env.COVERAGE),
    __TEST_CONTEXT__: JSON.stringify(testContext),
    __GREP__: (argv.grep || process.env.GREP) ? new RegExp((argv.grep || process.env.GREP).trim()).toString() : 'null',
    'process.env.NODE_ENV': '"production"',
}));

if (process.env.TEST) {
    config.entry = {index: config.entry.index};
    config.target = 'node';
} else {
    config.plugins.push(new SplitByPathPlugin([{
        name: 'vendor',
        path: path.join(__dirname, 'node_modules'),
    }]));
}

if (process.env.COVERAGE) {
    config.module.rules.push({
        test: /\.[jt]sx?$/,
        exclude: /node_modules[/\\]|tests[/\\]/,
        use: 'istanbul-instrumenter-loader',
        enforce: 'post',
    });
}

if (script === 'mocha:coverage') {
    process.env.ISTANBUL_REPORTERS = 'json=build/coverage/mocha/coverage.json';
    process.env.REMAP_ISTANBUL_REPORTERS = 'text-summary,lcovonly=build/coverage/mocha/lcov.info,html=build/coverage/mocha/html';
}

function setupIntellijKarmaReporter()
{
    const intellijServerModulePath = 'plugins/js-karma/js_reporter/karma-intellij/lib/intellijServer.js';

    if (process.argv[1] && process.argv[1].endsWith(path.normalize(intellijServerModulePath))) {
        process.env.INTELLIJ_KARMA_REPORTER = true;
        process.env.INTELLIJ_KARMA_REPORTER_COVERAGE = process.argv.join(' ').includes('--coverageTempDir=');

        if (process.env.INTELLIJ_KARMA_REPORTER_COVERAGE) {
            const intellijCliModulePath = process.argv[1].replace(/intellijServer\.js$/, 'intellijCli.js');
            const intellijCliModule = require(intellijCliModulePath);

            intellijCliModule.getBrowsers = () => [];
            intellijCliModule.getCoverageTempDirPath = () => {
                return path.join(__dirname, '.tmp/intellij-coverage');
            };
        }
    }
}

module.exports = config;
