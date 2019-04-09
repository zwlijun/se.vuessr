const crypto = require('crypto');
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const WorkBoxPlugin = require("workbox-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const VUESSRContext = require("../conf/server/context.conf");

const devMode = process.env.NODE_ENV !== 'production';

const config = merge(base, {
  resolve: !devMode ? {} : {
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
      template: 'src/templates/index.client.html',
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'server.html',
      template: 'src/templates/index.server.html'
    }),
    new VueSSRClientPlugin(),
    //service worker plugin
    //@see https://developers.google.cn/web/tools/workbox/modules/workbox-webpack-plugin
    new WorkBoxPlugin.GenerateSW({
      swDest: 'service-worker.js',
      importWorkboxFrom: "local",
      cacheId: !devMode ? VUESSRContext.service : (function(){
        const hmac = crypto.createHmac("sha1", VUESSRContext.service);
        hmac.update("" + Date.now() + "/" + Math.random());
        const hex_hmac = hmac.digest("hex");

        return VUESSRContext.service + "." + hex_hmac;
      })(),
      clientsClaim: true,
      skipWaiting: true,
      exclude: [/server\.html$/, /\.map$/],
      runtimeCaching: [
        {
          urlPattern: /\.json$/,
          handler: 'StaleWhileRevalidate',
          "options": {
            "cacheName": "JSON-CONF",
            "fetchOptions": {
              "mode": "cors"
            },
            "cacheableResponse": {
              "statuses": [0, 200]
            }
          }
        }
      ]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: (devMode ? [
      //@TODO 开发插件
    ] : [
      new UglifyJsPlugin()
    ]).concat([
      new OptimizeCSSAssetsPlugin()
    ]),
    nodeEnv: process.env.NODE_ENV,
    noEmitOnErrors: false,
    namedModules: false,
    namedChunks: false,
    moduleIds: devMode ? "named" : "hashed",
    chunkIds: devMode ? "named" : "natural",
    mangleWasmImports: false,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    flagIncludedChunks: true,
    occurrenceOrder: true,
    providedExports: true,
    usedExports: true,
    concatenateModules: true,
    sideEffects: false,
    portableRecords: false,
    runtimeChunk: false,
    splitChunks: {
        chunks: 'async',
        minSize: 1024 * 1024,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            name: "vendor",
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true
          },
          // styles: {
          //   name: "styles",
          //   chunks: "all",
          //   test: /\.(s?css)$/,
          //   priority: -5,
          //   minChunks: 1,
          //   reuseExistingChunk: true,
          //   enforce: true
          // },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
    }
  }
})

module.exports = config
