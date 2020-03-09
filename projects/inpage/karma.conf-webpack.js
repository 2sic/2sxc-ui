//Karma configuration Webpack variant, it is not used, only for testing
var webpackConf = require('./webpack.config.js');

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'jasmine',
      'karma-typescript'
    ],

    files: [
      '../2sxc-dnn742/Website/Resources/Libraries/jQuery/01_09_01/jquery.js', // resolve $
      '../2sxc-dnn742/Website/DesktopModules/ToSIC_SexyContent/Js/2sxc.api.min.js', // resolve $2sxc
      { pattern: './src/**/libs/*.js', watched: false },
      { pattern: './src/**/*.ts', watched: false },
      { pattern: './test/*.ts', watched: false }
    ],

    preprocessors: {
      './src/**/libs/*.js': ['webpack'],
      './src/**/*.ts': ['webpack', 'karma-typescript', 'sourcemap'],
      './test/*.ts': ['webpack', 'karma-typescript', 'sourcemap']
    },

    webpack: {
      //node: {
      //  fs: 'empty'
      //},
      target: 'node',
      context: webpackConf.context,
      devtool: webpackConf.devtool,
      // entry: webpackConf.entry,
      output: webpackConf.output,
      module: webpackConf.module,
      resolve: webpackConf.resolve,
      plugins: webpackConf.plugins
    },

    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },

    // list of files / patterns to exclude
    exclude: [
      './node_modules/*'
    ],

    typings: [
      './typings/**/*.d.ts'
    ],

    plugins: ['karma-*'],

    typescriptPreprocessor: {
      options: {
        sourceMap: true, // generate source maps
        noResolve: false // enforce type resolution
      },
      transformPath: function (path) {
        return path.replace(
          /\.ts$/,
          '.js');
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'jasmine-diff',
      'progress',
      'karma-typescript',
      'spec'
      // 'coverage-istanbul'
    ],

    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: true, // do not print information about skipped tests
      showSpecTiming: true // print the time elapsed for each spec
    },

    coverageIstanbulReporter: {
      reports: ['html', 'lcov', 'text-summary'],
      dir: './coverage', // coverage results needs to be saved under coverage/
      fixWebpackSourcePaths: true,
      query: {
        esModules: true
      }
    },

    jasmineDiffReporter: {
      multiline: true,
      pretty: true
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
