const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  plugins: [
    new CopyPlugin({
      patterns: [{from: 'manifest.json', to: 'manifest.json'}],
    })],
};
