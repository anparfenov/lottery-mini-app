const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        hot: false,
        port: 10888,
        host: '0.0.0.0',
        https: true,
    },
});
