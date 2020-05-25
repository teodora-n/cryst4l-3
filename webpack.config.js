const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        new BrowserSyncPlugin({
          host: 'localhost',
          port: 3000,
          server: { baseDir: ['dist'] }
        }),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'src/index.html',
          minify: true,
        }),
    ],
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [{ loader: MiniCssExtractPlugin.loader },
                    { loader: "css-loader" },
                    { loader: "sass-loader" },
                    { loader: "postcss-loader" },
                    { loader: 'sass-bulk-import-loader' },
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: 'images'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: 'fonts'
                    }
                }]
            }
        ],
    },

    mode: 'production',
    watch: true,
    watchOptions: {
      ignored: /node_modules/
    }
};