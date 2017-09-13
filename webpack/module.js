'use strict';

let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    rules: [
        {
            test: /\.ts$/,
            use: ['awesome-typescript-loader', 'angular2-template-loader']
        },
        {
            test: /\.html$/,
            use: 'raw-loader'
        },
        {
            test: /\.css$/,
            exclude: path.resolve(process.cwd(), 'app'),
            loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: 'css-loader'
            })
        },
        {
            test: /\.scss$/,
            //loaders: ['style-loader', 'css-loader', 'sass-loader']
            loader: ExtractTextPlugin.extract("css-loader!sass-loader")
        }
    ]
};
