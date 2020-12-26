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
    html: {
      template: 'demo/src/index.html',
    },
  },
}
