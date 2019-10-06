"use strict";

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const pages = require("./pages");
const paths = require("./paths");

const config = {
	mode: "production",
  entry: pages.entries,
  output: {
		path: paths.appBuild,
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
		modules: [
			paths.appSrc,
			"node_modules",
		],
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
		new CopyWebpackPlugin([
			{ from: "public" },
		]),
		...Object.keys(pages.entries).map(entryName =>
			new HtmlWebpackPlugin({
				inject: true,
				chunks: [entryName],
				filename: `${entryName}.html`,
				template: `./templates/${entryName}.html`,
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
			})
		),
		new MiniCssExtractPlugin({
			filename: "static/css/[name].[contenthash:8].css",
			chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
		}),
  ],
}

module.exports = config;
