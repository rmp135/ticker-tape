const Config = require('webpack-config').default

module.exports = new Config().extend('conf/webpack.config.base.js').merge({
  debug: true,
  devtool: '#source-map',
  output: {
    pathinfo: true
  },
  vendor: [
    'lodash/*'
  ]
})