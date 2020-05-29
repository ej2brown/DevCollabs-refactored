var path = require('path');
 var webpack = require('webpack');

 module.exports = {
    mode: 'development',
     entry: './src/index.ts',
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'main.bundle.ts',
         publicPath: '/',
     },
     module: {
         rules: [
             {
                 test: /\.ts$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map',
     devServer: {
        inline: false,
    },
 };