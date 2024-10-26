const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const common = require('../webpack.common.js');

module.exports = {
  ...common,
  entry: './src/index.js',
  plugins: [
    ...common.plugins,
    new ModuleFederationPlugin({
      name: 'main',
      remotes: {
        auth: 'auth@http://localhost:3001/remoteEntry.js',
        placesFeed: 'placesFeed@http://localhost:3002/remoteEntry.js',
        newPlaceForm: 'newPlaceForm@http://localhost:3003/remoteEntry.js',
        profile: 'profile@http://localhost:3004/remoteEntry.js',
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
