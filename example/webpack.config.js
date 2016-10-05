let path = require('path')

module.exports = {
  entry: path.join(__dirname, './index.js'),
  output: {
    path: __dirname,
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  module: {
    loaders: [ {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: [ 'es2015', 'stage-0', 'react' ],
        plugins: [ path.resolve('./src/babel') ]
      }
    } ]  
  }
  
}
