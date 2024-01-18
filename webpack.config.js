const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/ex-05.ts',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015',
        },
      },
    ],
  },
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000,
  },
  devServer: {
    publicPath: '/public/',
    compress: true,
    port: 9000,
    hot: true,
  },
}
