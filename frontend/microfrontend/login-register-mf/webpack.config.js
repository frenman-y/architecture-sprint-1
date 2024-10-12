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
      name: 'loginRegisterPackage',
      filename: 'remoteEntry.js',
      exposes: {
        './Login': './src/Login.js',
        './Register': './src/Register.js'
      },
      remotes: {
        'authPackage': 'authPackage@http://localhost:8082/remoteEntry.js'
      },
      shared: ['react', 'react-router-dom'],
    }),
      new HtmlWebpackPlugin({
        template: './index.html'
      })
  ]
};