const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
		filename: "static/js/[name].[contenthash:8].js",
		futureEmitAssets: true,
		chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
  },
  optimization: {
		minimizer: [
			// new OptimizeCSSAssetsPlugin({
			// 	cssProcessorOptions: {
			// 		parser: safePostCssParser,
			// 		map: {
			// 			inline: false,
			// 			annotation: true,
			// 		}
			// 	},
			// }),
		],
		runtimeChunk: "single",
		splitChunks: {
			chunks: "all",
			name: false,
		}
	},
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
    ]
  },
  module: {
    rules: [
			// {
			// 	oneOf: [
					{
						test: /\.(js|jsx)$/,
						use: "babel-loader",
						exclude: /node_modules/
					},
					{
						test: /\.(ts|tsx)?$/,
						loader: "ts-loader",
						exclude: /node_modules/
					},
					{
						test: /\.scss$/,
						use: [
							"style-loader",
							"css-loader",
							"sass-loader"
						]
					},
					{
						test: /\.png$/,
						use: [
							{
								loader: "url-loader",
								options: {
									mimetype: "image/png"
								}
							}
						]
					},
					{
						test: /\.svg$/,
						use: "file-loader"
					},
			// 	]
			// },
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			inject: true,
			template: "./public/index.html",
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
		}),
		// new MiniCssExtractPlugin({
		// 	filename: "static/css/[name].[contenthash:8].css",
		// 	chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
		// }),
  ],
}

module.exports = config;
