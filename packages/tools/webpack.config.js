const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    utils: './src/utils.js',
  },
  output: {
    // filename: '[name].bundle.js',
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // 打包后自动清除原来 dist 文件，只保留新文件
    publicPath: '/', // 确保路径
  },
  devtool: 'source-map', // 为了解决开发调试问题
  devServer: {
    open: true,
    static: './dist',
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App', 
      template: './index.html'
    }),
  ],
  module: {
    rules: [
      // { test: /\.(js|jsx)$/i, use: 'js-loader' },
      { test: /\.(css|less)$/i, use: ['style-loader', 'css-loader', 'less-loader'] },
    ]
  },
}