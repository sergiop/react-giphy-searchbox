module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactGiphySearchAndSelect',
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
            ? '[path][name]-[local]-[hash:base64:5]'
            : '[name]-[local]-[hash:base64:5]',
      },
    },
    html: {
      template: 'demo/src/index.html',
    },
  },
}
