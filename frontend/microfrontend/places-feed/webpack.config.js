const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const common = require('../webpack.common.js');

module.exports = {
  ...common,
  entry: './src/index.js',
  plugins: [
    ...common.plugins,
    new ModuleFederationPlugin({
      name: 'placesFeed',
      filename: 'remoteEntry.js',
      exposes: {
        './Card': './src/components/Card.js',
        './PlacesFeed': './src/components/PlacesFeed.js',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^18.0.0' },
      },
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
  },
};
