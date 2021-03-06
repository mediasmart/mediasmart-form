const path = require('path');

module.exports = {
  entry: './src/index.js',
  externals: {
    react: 'commonjs react',
  },
  module: {
    rules: [{
      exclude: /(node_modules|bower_components|build)/,
      include: path.resolve(__dirname, 'src'),
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env'],
        },
      },
    }, {
      exclude: /(node_modules|bower_components|build)/,
      include: path.resolve(__dirname, 'src'),
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    }],
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'build'),
  },
};
