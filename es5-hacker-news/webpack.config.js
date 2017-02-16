var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry:'./index.js',
    output: {
	path: 'dist',
	filename: 'bundle.[hash].js'
    },
    stats: {
	children: false,
    },
    devtool: 'eval',
    module:{
	rules:[{
		test:/\.js$/,
		use:'babel-loader',
		exclude: /node_modules/
	    }]
    },
    resolve: {
	alias:{
	    'react': 'preact-compat',
	    'react-dom': 'preact-compat'
	}
    },
    plugins: [
	      new HtmlWebpackPlugin({
		template:'./input.html',
		filename:'./index.html'
		  }),
	      new CleanWebpackPlugin(['dist'])]
}