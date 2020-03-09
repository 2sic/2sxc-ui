//Karma configuration
//Generated on Thu Jan 11 2018 14:00:13 GMT+0100 (Central European Standard Time)

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

    // list of files / patterns to load in the browser
    files: [
      '../2sxc-dnn742/Website/Resources/Libraries/jQuery/01_09_01/jquery.js', // resolve $
      '../2sxc-dnn742/Website/DesktopModules/ToSIC_SexyContent/Js/2sxc.api.min.js', // resolve $2sxc
      './src/polyfills/es6-promise.auto.js',
      './src/**/libs/*.js',
      './src/**/*.ts',
      './test/*.ts'
      //{ pattern: './src/**/libs/*.js', watched: false },
      //{ pattern: './src/**/*.ts', watched: false },
      //{ pattern: './test/*.ts', watched: true }
    ],

    // list of files / patterns to exclude
    exclude: [
      './test/assests/*',
      'node_modules'
    ],

    typings: [
      './typings/**/*.d.ts',
      '.node_modules/es6-promise/es6-promise.d.ts'
    ],

    karmaTypescriptConfig: {
      bundlerOptions: {
        noParse: ['clear'] // fix for "SyntaxError: Octal literal in strict mode"
      },
      compilerOptions: {
        lib: ['es2015.promise', 'es5', 'dom'] // fix for "'Promise' only refers to a type"
      }
    },

    plugins: ['karma-*'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.ts': ['karma-typescript']
    },

    typescriptPreprocessor: {
      options: {
        sourceMap: true, // generate source maps
        noResolve: false // enforce type resolution
      },
      transformPath: function (path) {
        return path.replace(/\.ts$/, '.js');
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'jasmine-diff',
      'progress',
      'karma-typescript'
    ],

    jasmineDiffReporter: {
      multiline: true,
      pretty: true
    },

    // web server port
    port: 29876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


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
