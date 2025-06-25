// Karma configuration
// Generated on Fri May 16 2025 13:34:01 GMT+0200 (Mitteleuropäische Sommerzeit)

module.exports = function (config) {
  config.set({
    basePath: "",
    files: ["./test/*.ts"],
    exclude: ["./test/assests/*"],
    frameworks: ["jasmine", "karma-typescript"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-typescript"),
    ],
    client: {
      clearContext: false,
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    preprocessors: {
      "./test/*.ts": ["karma-typescript"],
    },
    karmaTypescriptConfig: {
      tsconfig: "./tsconfig.json",
      compilerOptions: {
      target: "ES2022",
      module: "ES2022",
        types: [
          "jasmine"
        ]
      },
    },
    reporters: ["progress", "kjhtml", "karma-typescript"],
    browsers: ["Chrome"],
    restartOnFileChange: true,
  });
};
