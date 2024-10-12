const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const AddPlacePopup = require("./src/AddPlacePopup");

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'placePopupPackage',
      filename: 'remoteEntry.js',
      exposes: {
        './AddPlacePopup': './src/AddPlacePopup.js'
      },
      shared: ['react'],
      remotes: {
        'popupMf': 'popupMf@http://localhost:8086/remoteEntry.js',
        apiPackage: 'apiPackage@http://localhost:8083/remoteEntry.js',
      },
    }),
      new HtmlWebpackPlugin({
        template: './index.html'
      })
  ]
};