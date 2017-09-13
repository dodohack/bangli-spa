'use strict';

module.exports = {
    contentBase: '.',
    port: 7070,
    inline: true,
    historyApiFallback: true,
    stats: 'errors-only',
    watchOptions: {
        aggregateTimeout: 300,
        poll: 500
    }
};
