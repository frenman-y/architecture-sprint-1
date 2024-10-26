const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const common = require('../webpack.common.js');

module.exports = {
  ...common,
  entry: './src/index.js',
  plugins: [
    ...common.plugins,
    new ModuleFederationPlugin({
      name: 'shared',
      filename: 'remoteEntry.js',
      exposes: {
        './InfoTooltip': './src/components/InfoTooltip.js',
        './PopupWithForm': './src/components/PopupWithForm.js',
        './styles': './src/styles/popup.css',
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

