'use strict';

const path = require('path');
const fs = require('fs');
const minimist = require('minimist');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SplitByPathPlugin = require('webpack-split-by-path');
const intellijKarmaReporter = require('remap-istanbul/lib/intellijKarmaReporter');

const script = process.env.npm_lifecycle_event || '';
const config = {
    entry: {index: './src/index.tsx'},
    output: {
        path: __dirname + '/build',
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.ts', '.tsx', '.js'],
        alias: {
            sinon: __dirname + '/node_modules/sinon/pkg/sinon.js'
        }
    },
    devtool: script === 'build' ? false : 'inline-source-map',
    noInfo: true,
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }, {
                test: /\.less$/,
                loader: script === 'build' ? 'css!postcss!less' : 'css?sourceMap!postcss!less?sourceMap'
            }, {
                test: /sinon\.js$/,
                loader: 'imports?require=>false'
            }
        ]
    },
    plugins: [new CopyWebpackPlugin([
        {from: 'node_modules/jquery/dist/jquery.min.js'},
        {from: 'node_modules/lodash/lodash.min.js'},
        {from: 'node_modules/react/dist/react.min.js'},
        {from: 'node_modules/react-dom/dist/react-dom.min.js'}
    ])],
    devServer: {
        historyApiFallback: {index: '/dev-server.html'},
        inline: true,
        stats: 'errors-only'
    },
    postcss: () => [autoprefixer({browsers: 'last 2 versions'})]
};

if (script === 'build' || script === 'build:dev') {
    config.externals = {
        jquery: 'jQuery',
        lodash: '_',
        react: 'React',
        'react-dom': 'ReactDOM'
    };
    config['module'].loaders[1].loader = ExtractTextPlugin.extract(config['module'].loaders[1].loader);
    config.plugins.push(
        new SplitByPathPlugin([{
            name: 'vendor',
            path: path.join(__dirname, 'node_modules')
        }]),
        new ExtractTextPlugin('index.css')
    );
} else {
    config['module'].loaders[1].loader = 'style!' + config['module'].loaders[1].loader;
}

if (script === 'build') {
    config.plugins.push(
        new webpack.optimize.DedupePlugin,
        new webpack.optimize.OccurenceOrderPlugin,
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {warnings: false}
        })
    );
}

intellijKarmaReporter.register();
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
    config.module.postLoaders = [{
        test: /\.[jt]sx?$/,
        exclude: /node_modules[/\\]|tests[/\\]/,
        loader: 'remap-istanbul/lib/webpackInstrumenterLoader'
    }];
}

if (script === 'mocha:coverage') {
    process.env.ISTANBUL_REPORTERS = 'json=build/coverage/mocha/coverage.json';
    process.env.REMAP_ISTANBUL_REPORTERS = 'text-summary,lcovonly=build/coverage/mocha/lcov.info,html=build/coverage/mocha/html';
}

module.exports = config;
