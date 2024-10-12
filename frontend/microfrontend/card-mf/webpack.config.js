const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

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
      name: 'cardPackage',
      filename: 'remoteEntry.js',
      exposes: {
        './Card': './src/Card.js'
      },
      remotes: {
        'contextsPackage': 'contextsPackage@http://localhost:8084/remoteEntry.js',
        apiPackage: 'apiPackage@http://localhost:8083/remoteEntry.js',
      },
      shared: ['react']
    }),
      new HtmlWebpackPlugin({
        template: './index.html'
      })
  ]
};