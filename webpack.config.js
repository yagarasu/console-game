const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.mp3$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ]
      }
    ],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  optimization: {
    mangleExports: false,
    minimize: false
  },
  devServer: {
    port: 8000
  },
};