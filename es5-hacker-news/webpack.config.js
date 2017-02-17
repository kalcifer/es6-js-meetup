var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        path: 'dist',
        publicPath: '/',
        filename: 'bundle.[hash].js'
    },
    stats: {
        children: false
    },
    devtool: 'eval',
    resolve: {
        alias: {
            react: 'preact-compat',
            'react-dom': 'preact-compat'
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './input.html',
            filename: './index.html',
        }),
        new CleanWebpackPlugin(['dist'])]
};
