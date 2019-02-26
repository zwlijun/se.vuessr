const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const WorkBoxPlugin = require("workbox-webpack-plugin");
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const VUESSRContext = require("../conf/server/context.conf");

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
    new VueSSRClientPlugin(),
    new WorkBoxPlugin.GenerateSW({
      swDest: 'service-worker.js',
      importWorkboxFrom: "local",
      cacheId: VUESSRContext.service,
      clientsClaim: true,
      skipWaiting: true,
      exclude: [/index\.html$/, /\.map$/]
    })
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
    new UglifyJsPlugin()
  )
}

module.exports = config
