'use strict';

const path = require('path');
const fs = require('fs');
const minimist = require('minimist');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SplitByPathPlugin = require('webpack-split-by-path');

const script = process.env.npm_lifecycle_event || '';
const config = {
    entry: {index: path.resolve(__dirname, 'src/index.tsx')},
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            sinon: path.resolve(__dirname, 'node_modules/sinon/pkg/sinon.js')
        }
    },
    devtool: script === 'build' ? false : 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader'
            }, {
                test: /\.scss$/,
                use: [
                    {loader: 'css-loader', options: {sourceMap: script !== 'build'}},
                    {loader: 'postcss-loader'},
                    {loader: 'sass-loader', options: {sourceMap: script !== 'build'}}
                ]
            }, {
                test: /sinon\.js$/,
                use: 'imports-loader?require=>false'
            }
        ]
    },
    plugins: [new CopyWebpackPlugin([
        {from: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js')},
        {from: path.resolve(__dirname, 'node_modules/lodash/lodash.min.js')},
        {from: path.resolve(__dirname, 'node_modules/react/dist/react.min.js')},
        {from: path.resolve(__dirname, 'node_modules/react-dom/dist/react-dom.min.js')}
    ])],
    devServer: {
        historyApiFallback: {index: '/dev-server.html'},
        noInfo: true
    }
};

if (script === 'build' || script === 'build:dev') {
    config.externals = {
        jquery: 'jQuery',
        lodash: '_',
        react: 'React',
        'react-dom': 'ReactDOM'
    };

    config.module.rules[1].use.loader = ExtractTextPlugin.extract(config.module.rules[1].use);

    config.plugins.push(
        new SplitByPathPlugin([{
            name: 'vendor',
            path: path.join(__dirname, 'node_modules')
        }]),
        new ExtractTextPlugin('index.css')
    );
} else {
    config.module.rules[1].use.unshift('style-loader');
}

if (script === 'build') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {warnings: false}
        })
    );
}

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
    __GREP__: (argv.grep || process.env.GREP) ? new RegExp((argv.grep || process.env.GREP).trim()).toString() : 'null'
}));

if (process.env.TEST) {
    config.target = 'node';
    config.plugins.push(new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    }));
}

if (process.env.COVERAGE) {
    config.module.rules.push({
        test: /\.[jt]sx?$/,
        exclude: /node_modules[/\\]|tests[/\\]/,
        use: 'istanbul-instrumenter-loader',
        enforce: 'post'
    });
}

if (script === 'mocha:coverage') {
    process.env.ISTANBUL_REPORTERS = 'text-summary,lcovonly,html';
    process.env.ISTANBUL_REPORT_DIR = path.resolve(__dirname, 'build/coverage/mocha/html');
}

module.exports = config;
