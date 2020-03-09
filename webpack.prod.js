const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge")
const cleanWebpackPlugin = require("clean-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin")
const optimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const terserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = merge(common, {
    entry: "./src/index.js",
    output: {
        //contentHash to avoid caching problem
        filename: "main.[contentHash].js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [new optimizeCssAssetsPlugin(), new terserPlugin()]
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [miniCssExtractPlugin.loader,
                    'css-loader'],
            },
        ]
    },
    plugins: [
        new miniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
        new cleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ]
});