const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const script = process.env.npm_lifecycle_event || 'build';
const config = {
    entry: ['./src/index.ts'],
    output: {
        path: __dirname + '/build',
        filename: 'index.js'
    },
    resolve: {
        root: path.resolve('./src/'),
        extensions: ['', '.ts', '.js']
    },
    devtool: script === 'build' ? false : 'inline-source-map',
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            }, {
                test: /\.less$/,
                loader: script === 'build' ? 'css!postcss!less' : 'css?sourceMap!postcss!less?sourceMap'
            }
        ]
    },
    plugins: [new CopyWebpackPlugin([{from: 'node_modules/jquery/dist/jquery.min.js'}])],
    devServer: {
        historyApiFallback: {index: '/dev-server.html'},
        inline: true,
        stats: 'errors-only'
    },
    postcss: () => [autoprefixer({browsers: 'last 2 versions'})]
};

if (script === 'build' || script === 'build:dev') {
    config['module'].loaders[1].loader = ExtractTextPlugin.extract(config['module'].loaders[1].loader);
    config.plugins.push(new ExtractTextPlugin('index.css'));
} else {
    config['module'].loaders[1].loader = 'style!' + config['module'].loaders[1].loader;
}

module.exports = config;
