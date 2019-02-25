const path = require("path")
const webpack = require("webpack")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { VueLoaderPlugin } = require("vue-loader");

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    mode: process.env.NODE_ENV || "development",
    devtool: isProd ? false : "#cheap-module-source-map",
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
            "~conf": path.resolve(__dirname, "../conf"),
            "@": path.resolve(__dirname, "../src")
        }
    },
    plugins: isProd ? [
        new VueLoaderPlugin()
        // new VueLoaderPlugin(),
        // new ExtractTextPlugin({ 
        //     filename: 'static/css/common.[chunkhash].css' 
        // })
    ] : [
        new VueLoaderPlugin()
    ],
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [{
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    },
                    extractCSS: isProd,
                    postcss: [
                        require('autoprefixer')({
                            "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                        })
                    ]
                }
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
                    name: "static/img/[name].[chunkhash].[ext]"
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                query: {
                    limit: 10000,
                    name: "static/fonts/[name].[chunkhash].[ext]"
                }
            },
            {
                test: /\.(css|scss)$/,
                use: ["vue-style-loader", "css-loader", "sass-loader"]
                // use: isProd ? ExtractTextPlugin.extract({
                //     use: [
                //         {
                //             loader: "css-loader",
                //             options: {
                //                 minimize: true
                //             }
                //         }, 
                //         "sass-loader"
                //     ],
                //     fallback: "vue-style-loader"
                // }) : ["vue-style-loader", "css-loader", "sass-loader"]
                // loader: 'style-loader!css-loader!postcss-loader!sass-loader'
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