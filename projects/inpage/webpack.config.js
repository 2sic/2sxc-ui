const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const webpackHelpers = require('../webpack/webpack-helpers.js');
const CopyPlugin = require('copy-webpack-plugin');

const bundleName = "inpage";
const dnnTarget = webpackHelpers.DnnTargetFolder + '/dist/' + bundleName;
const assetsTarget = webpackHelpers.AssetsTarget + '/dist/' + bundleName;

const configuration = {
    mode: 'development',
    entry: "./src/index.ts",
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                sourceMap: true,
            }), 
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: { map: {
                    inline: false, 
                    annotation: webpackHelpers.ExternalSourcePath(bundleName) + bundleName + ".min.css.map" }
                }
            })
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'inpage.min.css',
            sourceMap: true
        }),
        webpackHelpers.CreateDefinePlugin(webpack),
          new CopyPlugin({
            patterns: [
                {
                    from: './i18n/*.json',
                    to: './',
                    transformPath(targetPath, absolutePath) {
                      return targetPath.replace('.json', '.js');
                    }
                }
            ],
        }),
        webpackHelpers.createCopyAfterBuildPlugin(assetsTarget, dnnTarget),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                include: [/src/, /icons/],
                exclude: /node_modules/,
                use: [ 
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader', options: { sourceMap: true } }
                ]
            },
            {
                // place images and font-files directly into the CSS
                // makes deployment, cache-breaking etc. much easier and transfers fewer files
                // https://www.npmjs.com/package/base64-inline-loader
                test: /\.(png|woff|svg)$/,
                exclude: /node_modules/,
                use: 'base64-inline-loader?limit=1000&name=[name].[ext]',
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: bundleName + ".min.js",
        path: assetsTarget, // webpackHelpers.DnnTargetFolder + '/dist/' + bundleName,
        library: '$2sxcInpage',
    },
};

/* change source map generation based on production mode */
module.exports = (env, argv) => {
    webpackHelpers.SetExternalSourceMaps(webpack, argv.mode, configuration, bundleName);
    return configuration;
}
