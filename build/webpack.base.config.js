const path = require("path")
const webpack = require("webpack")
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    mode: process.env.NODE_ENV || "development",
    devtool: isProd ? false : "#cheap-module-source-map",
    entry: {
        app: "./src/entry-client.js",
        // transform: "es6-promise/auto",
        core: "vue",
        plugins: [
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
    plugins: (isProd ? [
            //@TODO 生产插件
        ] : [
            //@TODO 开发插件
        ]).concat([
        new VueLoaderPlugin()
    ]),
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            {
                test: /\.html$/,
                use: [ {
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        removeComments: false,
                        collapseWhitespace: true,
                        removeAttributeQuotes: false,
                        interpolate: "require"
                    }
                }]
            },  
            {
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
                test: /\.(png|jpe?g|gif)$/,
                loader: "url-loader",
                exclude: /(node_modules|fonts)/,
                options: {
                    limit: 10000,
                    name: "static/img/[name].[md5:hash:hex:8].[ext]"
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: "url-loader",
                exclude: /(node_modules|img|images)/,
                query: {
                    limit: 10000,
                    name: "static/fonts/[name].[md5:hash:hex:8].[ext]"
                }
            },
            {
                test: /\.(css|scss)$/,
                use: [{
                    loader: "vue-style-loader",
                    options: {
                        minimize: true
                    }
                },{
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                },{
                    loader: "sass-loader",
                    options: {
                        minimize: true
                    }
                }]
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
        hints: "warning"
    }
}