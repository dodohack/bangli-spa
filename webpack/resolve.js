'use strict';

let path = require('path');

module.exports = {
    modules: [
        'node_modules',
        process.cwd()
    ],
    extensions: ['.ts', '.js', '.css', '.sass']
};
