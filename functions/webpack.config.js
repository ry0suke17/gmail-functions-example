const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    functions: './src/app/functions/index.ts',
    gmailtoken: './src/app/gmail/generatetoken/index.ts',
    gmailwatch: './src/app/gmail/watch/index.ts',
  },
  mode: 'development',
  target: 'node',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'this',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    alias: {
      '@infrastructure': path.resolve(__dirname, 'src/app/infrastructure'),
    },
  },
};
