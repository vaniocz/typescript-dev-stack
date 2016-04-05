var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config-common');

config.entry = ['./src/index.ts', 'webpack/hot/dev-server'];    
config.output = {
    path: __dirname + '/dist',
    filename: 'index.js',
    publicPath: '/dist/'
};
config.devtool = 'inline-source-map';
config.devServer = {
    hot: true,
    historyApiFallback: {index: '/dist/index.html'},
    inline: true,
    stats: 'errors-only',
};
config.plugins = [new webpack.HotModuleReplacementPlugin];

module.exports = config;
