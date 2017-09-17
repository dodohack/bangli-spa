'use strict';

var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = [
    new webpack.ProgressPlugin(),
    /*
    new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        process.cwd()
    ),
    */

    // Copy static images and resource files to public
    new CopyWebpackPlugin([
        { from: 'images', to: 'images'},
        { from: 'node_modules/font-awesome/fonts', to: 'fonts' },
    ]),

    new ExtractTextPlugin('style.[hash].css'),

    // Copy app/index.html into folder public and inject generated script/css
    // into it.
    new HtmlWebpackPlugin({
        template: 'app/index.html',
        // Order the injected js/css files with reversed alphabetical order
        chunksSortMode: function(a, b) {
            if (a.names[0] > b.names[0])
                return -1;
            if (a.names[0] < b.names[0])
                return 1;
            return 0;
        }
    })
];
