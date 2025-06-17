const { resolve } = require('path');
const merge = require('webpack-merge');
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const _isProd = _mode === 'production';
const { ThemedProgressPlugin } = require('themed-progress-plugin');
const webpackBaseConfig = {
    entry: {
        main: resolve('src/index.tsx'),
    },
    output: {
        path: resolve(process.cwd(), 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'swc-loader'
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader'
                ],
                include: [
                    resolve(__dirname, 'src'),
                    resolve(__dirname, 'node_modules')
                ],
            },
        ],

    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: _isProd ? 'styles/[name].[contenthash:8].css' : 'styles/[name].css',
            chunkFilename: _isProd ? 'styles/[name].[contenthash:8].css' : 'styles/[name].css',
            ignoreOrder: true,
        }),
        new ThemedProgressPlugin(),
    ],
}

module.exports = merge.default(webpackBaseConfig, _mergeConfig);