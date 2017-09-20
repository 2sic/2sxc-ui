const path = require('path');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const merge = require('webpack-merge');

const sxcJsFileBase = '2sxc.api';
const SxcApiPath = './2sxc-api/js/2sxc.api.ts';
const SxcDevWebPath = "C:\\Projects\\2SexyContent\\Web\\DesktopModules\\ToSIC_SexyContent\\";

const sxcJsDist = path.resolve(__dirname, 'js');


var copyAfterBuild = new WebpackShellPlugin({
    onBuildStart: ['echo "Starting"'],
    onBuildEnd: [
        'echo copying...',
        'copy ' + sxcJsDist + "\\" + sxcJsFileBase + "*.* " + SxcDevWebPath + "js\\"
    ]
});

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
};

const sxcProdConfig = merge(sxcDevConfig, {
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }
            // , copyAfterBuild
        )
    ],
    output: {
        filename: sxcJsFileBase + '.min.js',
    }
})

module.exports = [sxcDevConfig, sxcProdConfig];