const webpack = require('webpack');
const webpackHelpers = require('../webpack/webpack-helpers.js');

const assetsTarget = webpackHelpers.AssetsTarget + 'js';

const configuration = {
    mode: 'development',
    entry: "./src/2sxc.api.ts",
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "2sxc.api" + ".min.js",
        path: assetsTarget,
        library: '$2sxcJsApi',
    },
    plugins: [
        webpackHelpers.CreateDefinePlugin(webpack),
        // after build, copy the files from the project assets
        webpackHelpers.createCopyAfterBuildPlugin(assetsTarget, webpackHelpers.TargetsWithoutAssets, 'js'),
    ]
};

/* change source map generation based on production mode */

module.exports = (env, argv) => {
    webpackHelpers.SetExternalSourceMaps(webpack, argv.mode, configuration, 'js');
    return configuration;
}
