const path = require('path')

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false,
  },
  webpack: {
    aliases: {
      assets: path.resolve('src/assets'),
    },
    rules: {
      css: {
        modules: true,
        localIdentName: '[local]__[hash:base64:5]',
      },
    },
    html: {
      template: 'demo/src/index.html',
    },
  },
}
