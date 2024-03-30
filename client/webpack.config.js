const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');
const production = process.env.NODE_ENV === 'production';
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');


module.exports = {
    entry: {
        myAppName: path.resolve(__dirname, "./src/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: production ? '[name].[contenthash].js' : '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /node_modules/,
                use: [
                    production ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: !production
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: !production
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ],
    },
    resolve: {
        extensions: [".*", ".js", ".jsx", ".scss", '.css'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "Webpack & React",
            template: "./public/index.html",
            favicon: "./public/favicon.ico",
            publicPath: '/',
        }),
        new MiniCssExtractPlugin({
            filename: production ? '[name].[contenthash].css' : '[name].css',
        }),
        new MonacoWebpackPlugin()
    ],
    devServer: {
        port: 3000,
        hot: true,
        historyApiFallback: true,
    },
    mode: production ? 'production' : 'development'
};