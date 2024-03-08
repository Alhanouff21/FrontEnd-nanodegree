const path = require("path")
const webpack = require("webpack")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkBox = require('workbox-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    mode: 'production',
    entry: './src/client/index.js',
    module: {
        rules: [


            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                  outputPath: 'image',
                  name: '[name].[ext]',
                },
              },
        
            
        {
            test: '/\.js$/',
            exclude: /node_modules/,
            loader: "babel-loader"
        },
        {
            test: /\.scss$/,
            use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
        },
    ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new WorkboxPlugin.GenerateSW()
    ]
}