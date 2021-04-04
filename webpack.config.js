const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './front/index.js',
    output: {
        path: path.resolve(__dirname, 'dist-front'),
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'production'
}