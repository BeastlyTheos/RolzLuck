// Generated using webpack-cli http://github.com/webpack-cli
const path = require("path")

module.exports = {
	mode: "development",
	context: path.resolve(__dirname, "src"),
	entry: {
		content: "./content.js",
		popup: "./popup.js",
	},
	output: {clean: true},
	devtool: false,
	plugins: [
		// Add your plugins here
		// Learn more about plugins from https://webpack.js.org/configuration/plugins/
	],
	module: {
		rules: [
			{use: {loader: "babel-loader"}},
			// Add your rules for custom modules here
			// Learn more about loaders from https://webpack.js.org/loaders/
		],
	},
	resolve: {},
}
