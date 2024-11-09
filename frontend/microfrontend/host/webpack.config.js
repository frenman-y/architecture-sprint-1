const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin =
    require('webpack/lib/container/ModuleFederationPlugin');
const Dotenv = require('dotenv-webpack');

const path = require('path');
const deps = require('./package.json').dependencies;
const printCompilationMessage = require('./compilation.config.js');

module.exports = (_, argv) => ({
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    publicPath: 'http://localhost:3000/',
    // publicPath: path.join(__dirname, 'dist'),
  },  

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, 'src')],
    onListening: function (devServer) {
      const port = devServer.server.address().port

      printCompilationMessage('compiling', port)

      devServer.compiler.hooks.done.tap('OutputMessagePlugin', (stats) => {
        setImmediate(() => {
          if (stats.hasErrors()) {
            printCompilationMessage('failure', port)
          } else {
            printCompilationMessage('success', port)
          }
        })
      })
    }
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        'authentication': 'authentication@http://localhost:3002/remoteEntry.js',
        'user_profile': 'user_profile@http://localhost:3003/remoteEntry.js',
        'gallery': 'gallery@http://localhost:3004/remoteEntry.js',
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new Dotenv()
  ],
});
