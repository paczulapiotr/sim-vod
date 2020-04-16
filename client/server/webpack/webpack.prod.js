/* eslint-disable */
const path = require('path');

module.exports = {
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        extensions: ['.js'],
    },
    mode: 'production',
    entry: {
        main: ['./server/server.js'],
    },
    output: {
        path: path.resolve(__dirname, '../../build-server/'),
        filename: 'server.js',
        publicPath: '/',
    },
};
