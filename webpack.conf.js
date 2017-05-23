const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		path: __dirname + '/public/',
		filename: 'bundle.js',
		publicPath: 'http://localhost:8080/'
	},
	// devtool: 'source-map',
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader'
		}]
	},
	devServer: {
		contentBase: './public',
		port: 8080,
		noInfo: false,
		hot: true,
		inline: true,
		proxy: {
			'/': {
				secure: false,
				bypass: (req, res, proxyOptions) => {
					return	 ['.js'].includes(req.url.slice(-3)) ||
								['.css', '.jpg'].includes(req.url.slice(-4)) ||
								['.json'].includes(req.url.slice(-5)) ? false : '/index.html';
				}
			}
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};
