const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const join = function(dest) {
  return path.resolve(__dirname, dest);
};

const web = function(dest) {
  return join('web/static/' + dest);
};

var config = module.exports = {
  devtool: 'source-map',

  entry: {
    application: [
      web('css/application.sass'),
      web('js/application.js'),
    ],
  },

  output: {
    path: join('priv/static'),
    filename: 'js/application.js',
  },

  resolve: {
    extensions: ['', '.js', '.sass'],
    modulesDirectories: ['node_modules'],
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy'],
          presets: ['react', 'es2015', 'stage-2', 'stage-0'],
        },
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass?indentedSyntax&includePaths[]=' + __dirname +  '/node_modules'),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('css/application.css'),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  );
}
