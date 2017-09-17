'use strict';

var path = require('path');

module.exports = {
    path: path.join(process.cwd(), 'public'),
    filename: '[name].[hash].js'
};
