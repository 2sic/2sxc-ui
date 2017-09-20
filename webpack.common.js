const path = require('path');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const merge = require('webpack-merge');

const sxcJsFileBase = '2sxc.api';
const SxcApiPath = './2sxc-api/js/2sxc.api.ts';
const SxcDevWebPath = "C:\\Projects\\2SexyContent\\Web\\DesktopModules\\ToSIC_SexyContent\\";
// const SxcDevWebPath = "c:\\temp\\x\\";

const sxcJsDist = path.resolve(__dirname, 'js');


var copyAfterBuild = new WebpackShellPlugin({
    onBuildStart: ['echo will auto-copy once built to ' + SxcDevWebPath ],
    onBuildEnd: [
        // 'echo copying...',
        'copy "' + sxcJsDist + "\\" + sxcJsFileBase + '*.*" "' + SxcDevWebPath + 'js" /y'
    ],
    dev: false // necessary to execute multiple times
});

const enableMc = true;  // enable multi-compile of both standard + minified

const sxcDevConfig = {
    entry: {
        "sxc-js": SxcApiPath
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: sxcJsFileBase + '.js',
        path: sxcJsDist
    },
    plugins: enableMc ? [] : [ copyAfterBuild ]
};

/**
 * production configuration
 */
const prodPlugins = [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }
            // ,copyAfterBuild
        )
    ];
if(enableMc) prodPlugins.push(copyAfterBuild);
const sxcProdConfig = merge(sxcDevConfig, {
    devtool: 'source-map',
    plugins: prodPlugins,
    output: {
        filename: sxcJsFileBase + '.min.js',
    }
})


const compileList = [sxcDevConfig];
if(enableMc) compileList.push(sxcProdConfig);

module.exports = compileList;