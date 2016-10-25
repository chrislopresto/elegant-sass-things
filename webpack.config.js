var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, '/demo/js/demo.js')
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'demo.js',
    publicPath: '/js/'
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /\.js$/,
        exclude: /node_modules/,
        query: {
          plugins: [],
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin,
    new webpack.optimize.UglifyJsPlugin
  ]
};
