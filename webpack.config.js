const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        absolute: './client/src/absolute.ts',
    },
    module: {
        rules: [
            {
              test: /\.tsx?$/,
              use: 'ts-loader',
              exclude: /node_modules/
            }
          ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: './client/static' },
      ])
    ],
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'out/client')
    },
}