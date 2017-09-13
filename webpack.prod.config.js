/**
 * TODO:
 * 1. Use google closure compiler to compile the code:
 * http://blog.mgechev.com/2016/07/21/even-smaller-angular2-applications-closure-tree-shaking/
 * 2. Tree shaking.
 */
'use strict';
var path = require('path');
var webpack = require('webpack');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {
    entry: require('./webpack/entry'),

    context: process.cwd(),

    output: require('./webpack/output'),

    module: require('./webpack/module'),

    plugins: require('./webpack/plugins').concat([
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: true
        })
    ]),

    resolve: require('./webpack/resolve'),

    stats: 'errors-only',

    devtool: 'source-map'
};
