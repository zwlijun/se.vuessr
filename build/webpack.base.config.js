const path = require("path")
const { VueLoaderPlugin } = require("vue-loader");
const vueConfig = require("./vue-loader.config")
const webpack = require("webpack")

module.exports = {
    devtool: "#source-map",
    entry: {
        app: "./src/entry-client.js",
        vendor: [
            "es6-promise/auto",
            "vue",
            "vue-router",
            "vuex",
            "vuex-router-sync"
        ]
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/",
        filename: "static/js/[name].[chunkhash].js"
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            "~lib": path.resolve(__dirname, "../src/lib"),
            "@": path.resolve(__dirname, "../src")
        }
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [{
                test: /\.vue$/,
                loader: "vue-loader",
                options: vueConfig
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "static/img/[name].[hash:7].[ext]"
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                query: {
                    limit: 10000,
                    name: "static/fonts/[name].[hash:7].[ext]"
                }
            },
            {
                test: /\.(css|scss)$/,
                loader: "style-loader!css-loader!postcss-loader!sass-loader"
            }
        ]
    },
    performance: {
        hints: process.env.NODE_ENV === "production" ? "warning" : false
    },
    resolveLoader: {
        alias: {
            "scss-loader": "sass-loader"
        }
    }
}