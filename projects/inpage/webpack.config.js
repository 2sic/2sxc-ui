// const path = require("path");
const ExternalSourceMaps = require('./webpack/external-source-maps');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const sxcJsFileBase = "inpage";
const SxcApiPath = "./src/inpage.{}.ts";
const SxcDevWebPath = "C:\\Projects\\2sxc-dnn742\\Website\\DesktopModules\\ToSIC_SexyContent\\";
// const SxcDevWebPath = "c:\\temp\\2020-04-20\\";
const webpackLibName = '$2sxcInpage';

const sxcJsDist = SxcDevWebPath + '/dist/inpage';

// Get the version, for cache-breaking
var package = require('./package.json');
var version = package.version;


const configuration = {
    mode: 'development',
    entry: SxcApiPath,
    devtool: 'source-map',
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
            // {
            //     test: /\.(woff)$/,
            //     exclude: /node_modules/,
            //     use: {
            //       loader: 'file-loader',
            //       options: {
            //         name: 'assets/[name].[ext]?' + version, // package.json version
            //       },
            //     },
            // },
            {
                // place images and font-files directly into the CSS
                // makes deployment, cache-breaking etc. much easier and transfers fewer files
                // https://www.npmjs.com/package/base64-inline-loader
                test: /\.(png|woff)$/,
                exclude: /node_modules/,
                use: 'base64-inline-loader?limit=1000&name=[name].[ext]'
                // use: {
                //   loader: 'file-loader',
                //   options: {
                //     name: 'assets/[name].[ext]?' + version, 
                //   },
                // },
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: sxcJsFileBase + ".min.js",
        path: sxcJsDist,
        library: webpackLibName,
    },
};

/* change source map generation based on production mode */

module.exports = (env, argv) => {
    // console.log(env);
    // console.log(argv);
    ExternalSourceMaps.setExternalSourceMaps(argv.mode, configuration, 'js');
    return configuration;
}
