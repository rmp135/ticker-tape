module.exports = {
  entry: './src/index.ts',
  output: {
    path: './lib',
    filename: '[name].js',
    chunkFilename: 'ticker-tape',
    library: ['TickerTape']
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
}