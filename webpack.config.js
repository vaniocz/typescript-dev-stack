var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['./src/index.ts'],
    output: {
        path: __dirname + '/dist',
        filename: 'index.js',
        publicPath: '/dist/'
    },
    resolve: {
        root: path.resolve('./src/'),
        extensions: ['', '.ts', '.webpack.js', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    devServer: {
        historyApiFallback: {index: '/dist/index.html'},
        inline: true,
        stats: 'errors-only'
    }
};
