module.exports = {
    presets: [['@babel/preset-env', {
      targets: {
        node: '20'
      }
    }]],
    env: {
      test: {
        plugins: [
          '@babel/plugin-transform-modules-commonjs',
          '@babel/plugin-transform-runtime'
        ]
      }
    }
  }
