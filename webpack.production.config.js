const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

// local css modules
loaders.push({
  test: /[\/\\]src[\/\\].*\.css$/,
  loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
});
// global css files
loaders.push({
  test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
  loader: ExtractTextPlugin.extract('style', 'css'),
});
// local css modules
loaders.push({
  test: /[\/\\]src[\/\\].*\.less$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
});

module.exports = {
  entry: [
    './src/browser.js',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[chunkhash].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders,
  },
  plugins: [
    /* new WebpackCleanupPlugin({
      exclude: ['assets/', 'fonts/'],
    }),*/
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true,
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[contenthash].css', {
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: './server/template.html',
      title: 'Webpack App',
    }),
  ],
};
