const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    output: {
      filename: '[name].bundle.js',
        libraryTarget: 'var',
        library: 'Client'
    },
    mode: 'development',

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
                loader: 'babel_loader'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin ({
        template: './src/client/views/index.html',
        filename: './index.html'
    }),
        new CleanWebpackPlugin ({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
}