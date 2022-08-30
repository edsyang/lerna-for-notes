const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  console.log('Goal: ', env.goal); // 'local'
  console.log('Production: ', env.production); // true

  return {
    mode: 'development',
    entry: {
      index: './src/index.js',
      utils: './src/utils.js',
      'custom-library': './src/custom-library.js',
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
      hot: true, // 也可以通过 string 的形式，来指定某个模版热更新
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
    externals: {
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_',
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
}