// Plugins
const ExternalSourceMaps = require('./webpack/external-source-maps');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

// Version for source maps
const pjson = require('./package.json');
const version = pjson.version;

// Starting values
const SxcApiPath = "./src/index.ts";

// Output values
const webpackLibName = '$2sxcInpage';
const bundleName = "inpage";
const subPath = 'dist/inpage';
const webPath = "C:\\Projects\\2sxc-dnn742\\Website\\DesktopModules\\ToSIC_SexyContent\\";
// const webPath = "c:\\temp\\2020-04-20\\";
const dist = webPath + '/' + subPath;
const externalSourcePath = 'https://sources.2sxc.org/' + version + '/inpage/';


const configuration = {
    mode: 'development',
    entry: SxcApiPath,
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                sourceMap: true,
            }), 
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: { map: {
                    inline: false, 
                    annotation: externalSourcePath + bundleName + ".min.css.map" }
                }
            })
        ],
    },
    plugins: [new MiniCssExtractPlugin({
        filename: 'inpage.min.css',
        sourceMap: true
    })],
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
        path: dist,
        library: webpackLibName,
    },
};

/* change source map generation based on production mode */
module.exports = (env, argv) => {
    // console.log(env);
    // console.log(argv);
    ExternalSourceMaps.setExternalSourceMaps(argv.mode, configuration, 'inpage');
    return configuration;
}
