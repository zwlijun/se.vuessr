const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const config = merge(base, {
  resolve: process.env.NODE_ENV === 'production' ? {} : {
      alias: {
          'vue': 'vue/dist/vue.js'
      }
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // generate output HTML
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/templates/index.render.html'
    }),
    new VueSSRClientPlugin()
  ],
  optimization: {
    splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
    },
    minimizer: []
  }
})

if (process.env.NODE_ENV === 'production') {
  config.optimization.minimizer.push(
    // minify JS
    new UglifyJsPlugin(),
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'vue-hn',
      filename: 'service-worker.js',
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
    })
  )
}

module.exports = config
