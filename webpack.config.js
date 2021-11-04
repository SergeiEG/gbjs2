const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    target: 'web',
    entry: {
        main: path.resolve(__dirname, './public/js/main.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.[contenthash].js',
    },
    devServer: {
        port: 8080,
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, './public/index.html') }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
    ],
    module: {
        rules: [{
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'img-optimize-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.mp(3|4)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
        ]
    },
}