module.exports = {
    preserveWhitespace: false,
    postcss: [
        require('autoprefixer')({
            "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
        })
    ]
}