const Config = require('webpack-config').default
const webpack = require('webpack')

module.exports = new Config().extend('conf/webpack.config.base.js').merge({
  output: {
    filename: '[name].min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    })
  ]
})