'use strict';

const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',

    output: {
        filename: 'project.bundle.js',
        path: path.resolve(__dirname, 'build')
    },

    module: {
        rules: [
          {
            test: [ /\.vert$/, /\.frag$/ ],
            use: 'raw-loader'
          },
          {
            test: /\.js$/,
            include: path.resolve(__dirname, 'src/'),
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          }
        ]
    },
    
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        writeToDisk: true
    },

    plugins: [
        new CopyPlugin({
            patterns: [
              { from: path.resolve(__dirname, 'index.html'), to: path.resolve(__dirname, 'build') },
              { from: 'assets/**/*',
                to: path.resolve(__dirname, 'build')
              }
            ],
        }),
        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true)
        }),
    ]
};
