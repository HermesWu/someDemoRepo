const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          // "style-loader", // creates style nodes from JS strings
          // "css-loader", // translates CSS into CommonJS
          {loader:'style-loader'},
          {loader: 'css-loader', options: { importLoaders: 1 } },
          {loader:'postcss-loader'},
          {loader:"sass-loader"} // compiles Sass to CSS
        ]
      }
    ]
  }
};