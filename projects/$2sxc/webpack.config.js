// const path = require("path");
const sm = require('./webpack/external-source-maps');

const sxcJsFileBase = "2sxc.api";
const SxcApiPath = "./src/2sxc.api.ts";
const SxcDevWebPath = "C:\\Projects\\2sxc-dnn742\\Website\\DesktopModules\\ToSIC_SexyContent\\";

const sxcJsDist = SxcDevWebPath + '/js';

const configuration = {
    mode: 'development',
    entry: SxcApiPath,
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
        filename: sxcJsFileBase + ".min.js",
        path: sxcJsDist,
        library: '$2sxcJsApi',
    },
    // plugins: enableMc ? [] : [copyAfterBuild]
};

/* change source map generation based on production mode */

module.exports = (env, argv) => {
    // console.log(env);
    // console.log(argv);
    sm.setExternalSourceMaps(argv.mode, configuration, 'js');
    return configuration;
}
