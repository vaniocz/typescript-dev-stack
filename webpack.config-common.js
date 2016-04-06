var path = require('path');
var webpack = require('webpack');

module.exports = {
    resolve: {
        root: path.resolve('./src/'),
        extensions: ['', '.ts', '.webpack.js', '.js'],
        alias: {
            lodash: 'lodash/lodash.min.js'
        }
    },
    module: {
        loaders: [
            {
                test: /\.webpack\.js$/,
                loader: 'babel-loader'
            }, {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    }
};
