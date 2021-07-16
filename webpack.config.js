const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
  target: 'web',
  mode: 'development',
  entry: [
    path.resolve(__dirname, './src/index.js')
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[contenthash:8].js',
    clean: true
  },
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, './dist'),
    inline: true,
    hot: true,
    open: true,
  },
  devtool: 'eval-cheap-module-source-map',
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, './src/components'),
      contexts: path.resolve(__dirname, './src/contexts'),
      images: path.resolve(__dirname, './src/images'),
      pages: path.resolve(__dirname, './src/pages'),
      styles: path.resolve(__dirname, './src/styles'),
      utils: path.resolve(__dirname, './src/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      favicon: path.resolve(__dirname, './public/logo192.png'),
    }),
    new WebpackManifestPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
};