const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = function(env) {
  const rules = [
    {
      test: /\.js?$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              require.resolve('babel-preset-env'),
            ],
          },
        },
      ],
    },
    {
      test: /\.svg$/,
      loader: 'svg-inline-loader'
    }
  ];

  return {
    devtool: 'eval-source-map',
    target: 'node',
    externals: [nodeExternals()],
    mode: 'development',
    entry: path.resolve('server.js'),
    output: {
      path: path.resolve(),
      filename: 'service.js',
    },
    module: {
      rules: rules,
    },
  };
};
