/* webpack static module bundler

After bounding, it will copy of all files from **./dist/** to **C:/Projects/2sxc-dnn742/Website/DesktopModules/ToSIC_SexyContent/dist/ folder.
Supports bundling for Development or Production (depending on process.env.NODE_ENV, but 'development' is default).

Development
- currently bundles only ts & js files to support watch mode
- bundling of *.css, and other assets is skipped

Production
- bundles all ts/js and css files
- currently all css files are minimized (only min.css have to be minimized)
- copy 4 icon*.png images to C:\Projects as side effect of Run-Production, so that link reference in css file are correctly pointing to C:\Projects\2sxc-dnn742\Website\DesktopModules\ToSIC_SexyContent
- currently do not work in watch mode

TypeDoc
Documentation can be auto-generated in ./docs folder, but you have to change variable enerateTypedocDocumentation* to true.
For faster webpack execution during development it is not enabled by default.
*/

var webpack = require('webpack');
var glob = require('glob');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FileManagerPlugin = require('filemanager-webpack-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const setExternalSourceMaps = require('./build-helpers/external-source-maps');

var entryJsFiles = glob.sync('./src/**/libs/*.js');
var entryTsFiles = glob.sync('./src/**/*.ts', {
  ignore: ['./src/inpage.{}.ts'],
});
var entryFiles = ['./src/inpage.{}.ts'].concat(
  entryJsFiles.concat(entryTsFiles)
);
var entryCssFiles = glob
  .sync('./src/**/*.css')
  .concat(['./icons/inpage-icons-codes.css']);

var nodeEnv = (process.env.NODE_ENV || 'development').trim();
var isProd = nodeEnv === 'production';
var generateTypedocDocumentation = false;

var package = require('./package.json');
var version = package.version;

var inpageCss = isProd ? './inpage/inpage.min.css' : './inpage/inpage.css';

// The dist folder must be "deeper" than normal, because some files also get written to a folder above it
const deepDistFolder = '/dist/ToSic_SexyContent/dist';

// the deployment folder, where things should be copied to after building
const deployFolder = '../../../2sxc-dnn742/Website/DesktopModules/ToSIC_SexyContent/dist/inpage';

// Webpack plugins
var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),

  new ForkTsCheckerWebpackPlugin(),

  new UglifyJsPlugin({
    include: /\.min\.js$/,
    sourceMap: true,
  }),

  new ExtractTextPlugin(inpageCss),

  // copy the files to the dnn folder where 2sxc is being developed
  new FileManagerPlugin({
    onEnd: [
      {
        copy: [
          {
            source: '.' + deepDistFolder + '/inpage/*.min.*',
            destination: deployFolder,
          },
          {
            source: '.' + deepDistFolder + '/assets/*',
            destination: deployFolder + '/assets'
          },
        ],
      },
    ],
  }),
];

// Build the webpack config
var config = {
  // to automatically find tsconfig.json
  context: __dirname,

  // enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  // get all files for boundles
  entry: {
    './inpage/inpage.js': entryFiles,
    './inpage/inpage.min.js': entryFiles,
  },

  output: {
    filename: '[name]',
    path: __dirname + deepDistFolder,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: /src/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true, // IMPORTANT! use transpileOnly mode to speed-up compilation
        },
      },
    ],
  },

  resolve: { extensions: ['.ts', '.js', '.css'] },

  plugins: plugins,
};

// set external source map - do this with the prepared config
if (isProd) setExternalSourceMaps(config, 'inpage');

// note: is false as configured in this document, doesn't seem used ATM
if (generateTypedocDocumentation) {
  plugins.push(
    new TypedocWebpackPlugin(
      {
        name: '2sxc-inpage',
        mode: 'modules',
        includeDeclarations: true,
        ignoreCompilerErrors: true,
        out: '../docs',
        module: 'commonjs',
        target: 'es5',
        exclude: '**/node_modules/**/*.*',
        experimentalDecorators: true,
        excludeExternals: true,
        extends: './tsconfig.json',
      },
      entryTsFiles
    )
  );
}

// also build / minify the CSS with source-maps
config.entry[inpageCss] = entryCssFiles;
config.module.rules.push({
  test: /\.css$/,
  include: [/src/, /icons/],
  use: ExtractTextPlugin.extract([
    {
      loader: 'css-loader',
      options: {
        minimize: isProd,
        sourceMap: true,
        name: './inpage/[name].[ext]',
      },
    },
  ]),
});

// include the 4 icons, but put them in a special place so links in the CSS get rewritten like we need them
// so that link reference in css file are correctly pointing to C:\Projects\2sxc-dnn742\Website\DesktopModules\ToSIC_SexyContent
config.module.rules.push({
  test: /\.png$/,
  exclude: /node_modules/,
  use: {
    loader: 'file-loader',
    options: {
      name: '../../[name].[ext]', 
    },
  },
});

// also copy-deploy the woff font file
// and update the link to them using the release version, so updates will break caches
config.module.rules.push({
  test: /\.(woff)$/,
  exclude: /node_modules/,
  use: {
    loader: 'file-loader',
    options: {
      name: 'assets/[name].[ext]?' + version, // package.json version
    },
  },
});

module.exports = config;
