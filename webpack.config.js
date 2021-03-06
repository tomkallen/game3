const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')
const p2 = path.join(phaserModule, 'build/custom/p2.js')

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
})

const TARGET = process.env.npm_lifecycle_event

const common = {
  entry: {
    app: [
      // 'babel-polyfill',
      path.resolve(__dirname, 'src/index.js')
    ],
    vendor: ['pixi', 'p2', 'phaser-ce']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: 'bundle.js'
  },
  plugins: [
    definePlugin,
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'/* chunkName= */,
      filename: 'vendor.bundle.js'/* filename= */
    })
  ],
  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'js') },
      { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: /p2\.js/, use: ['expose-loader?p2'] }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    alias: {
      'phaser-ce': phaser,
      'pixi': pixi,
      'p2': p2
    }
  }
}

if (TARGET === 'build') {
  module.exports = merge(common, {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        drop_console: true,
        sourceMap: true,
        output: {
          comments: false
        }
      })
    ]
  })
} else {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    watch: true,
    output: {
      pathinfo: true
    },
    plugins: [
      new BrowserSyncPlugin({
        host: process.env.IP || 'localhost',
        port: process.env.PORT || 3001,
        server: { baseDir: ['./'] }
      })
    ]
  })
}
