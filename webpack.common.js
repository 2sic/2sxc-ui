const path = require("path");
const webpack = require("webpack");
const WebpackShellPlugin = require("webpack-shell-plugin");
const merge = require("webpack-merge");
const pjson = require("./package.json");

const sxcJsFileBase = "2sxc.api";
const SxcApiPath = "./2sxc-api/js/2sxc.api.ts";
const SxcDevWebPath =
    "C:\\Projects\\2sxc-dnn742\\Website\\DesktopModules\\ToSIC_SexyContent\\";

const sxcJsDist = path.resolve(__dirname, "js");
const enableMc = true; // enable multi-compile of both standard + minified

module.exports = env => {
    const prodBuild = env.prod == "true";
    console.log("env:" + JSON.stringify(env));
    /**
     * The copy action after building - will be inserted later on
     */
    let copyAfterBuild = new WebpackShellPlugin({
        onBuildStart: ["echo will auto-copy once built to " + SxcDevWebPath],
        onBuildEnd: [
            // 'echo copying...',
            'copy "' +
                sxcJsDist +
                "\\" +
                sxcJsFileBase +
                '*.*" "' +
                SxcDevWebPath +
                'js" /y'
        ],
        dev: false // necessary to execute multiple times
    });

    /**
     * The dev configuration for the build
     */
    const sxcDevConfig = {
        entry: {
            "sxc-js": SxcApiPath
        },
        // devtool: 'inline-source-map',
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
            filename: sxcJsFileBase + ".js",
            path: sxcJsDist
        },
        plugins: enableMc ? [] : [copyAfterBuild]
    };

    /**
     * production configuration
     */
    const prodPlugins = [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin(
            {
                "process.env": {
                    NODE_ENV: JSON.stringify("production")
                }
            }
            // ,copyAfterBuild
        )
    ];

    if (prodBuild)
        prodPlugins.push(
            // new 10.25 - disable these lines to get a dev-sourcemap, but keep it for production!
            new webpack.SourceMapDevToolPlugin({
                // this is the url of our local sourcemap server
                publicPath:
                    "https://sources.2sxc.org/" + pjson.version + "/" + "js" + "/",
                filename: "[file].map"
            })
        );
    if (enableMc) prodPlugins.push(copyAfterBuild);

    /**
     * The final production configuration is the base + production-plugins
     */
    const sxcProdConfig = merge(
        sxcDevConfig,
        {
            // reactivate this for temporary development
            plugins: prodPlugins,
            output: {
                filename: sxcJsFileBase + ".min.js"
            }
        },
        // in prod-build, that's it, otherwise in dev add source-maps
        prodBuild
            ? {}
            : {
                devtool: "source-map"
            }
    );

    const compileList = [sxcDevConfig];
    if (enableMc) compileList.push(sxcProdConfig);

    return compileList
};
