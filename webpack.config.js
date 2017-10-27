const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './public/index.js',
  plugins: [
    new UglifyJSPlugin(),
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
};
