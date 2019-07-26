module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactGiphySearchbox',
      externals: {
        react: 'React',
      },
    },
  },
  webpack: {
    rules: {
      css: {
        modules: true,
        localIdentName:
          process.env.NODE_ENV === 'production'
            ? '[hash:base64:5]'
            : '[path][name]-[local]-[hash:base64:5]',
      },
    },
    html: {
      template: 'demo/src/index.html',
    },
  },
}
