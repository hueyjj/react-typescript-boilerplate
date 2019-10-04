const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//const allEntries = glob.sync("./src/*.page.tsx");
const allEntries = { 
	"home": "./src/index.page.tsx", 
	"signup": "./src/signup.page.tsx",
}
console.log(allEntries);

const config = {
	mode: "production",
  // entry: "./src/index.tsx",
  entry: allEntries,
  output: {
    path: path.resolve(__dirname, "build"),
		filename: "static/js/[name].[contenthash:8].js",
		futureEmitAssets: true,
		chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
  },
  optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					parse: {
						ecma: 8,
					},
					compress: {
						ecma: 5,
						warnings: false,
						comparisons: false,
						inline: 2,
					},
					mangle: {
						safari10: true,
					},
					output: {
						ecma: 5,
						comments: false,
						ascii_only: true,
					},
				},
				extractComments: false,
				parallel: true,
				cache: true,
				sourceMap: true,
			}),
		],
		splitChunks: {
			chunks: "all",
			name: false,
		},
		runtimeChunk: {
			name: entrypoint => `runtime-${entrypoint.name}`,
		},
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
			{
				oneOf: [
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
							MiniCssExtractPlugin.loader,
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
						loader: "file-loader",
						exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
						options: {
							name: "static/media/[name].[hash:8].[ext]",
						},
					},
				]
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			inject: true,
			chunks: ["home"],
			filename: "home.html",
			template: "./public/index.html",
			favicon: "./public/favicon.ico",
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
		new HtmlWebpackPlugin({
			inject: true,
			filename: "signup.html",
			chunks: ["signup"],
			template: "./public/signup.html",
			favicon: "./public/favicon.ico",
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
		new MiniCssExtractPlugin({
			filename: "static/css/[name].[contenthash:8].css",
			chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
		}),
  ],
}

module.exports = config;
