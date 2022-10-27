const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const assetsDir = path.resolve(__dirname, 'public/assets');
const plugins = [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
];
if (fs.existsSync(assetsDir)) {
    if (fs.readdirSync(assetsDir).length !== 0) {
        plugins.push(
            new CopyWebpackPlugin({
                patterns: [{ from: './public/assets', to: 'assets' }],
            })
        );
    }
}

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', { loader: 'css-loader' }],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins,
};
