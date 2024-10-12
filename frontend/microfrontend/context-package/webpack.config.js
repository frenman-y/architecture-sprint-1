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
      name: 'contextsPackage',
      filename: 'remoteEntry.js',
      exposes: {
        './CurrentUserContext': './src/CurrentUserContext.js'
      },
      remotes: {
        apiPackage: 'apiPackage@http://localhost:8083/remoteEntry.js',
      },
      shared: ['react']
    }),
      new HtmlWebpackPlugin({
        template: './index.html'
      })
  ]
};