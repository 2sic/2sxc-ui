const path = require("path");

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
    modules: [__dirname, "src", "node_modules"],
    extensions: ["*", ".tsx", ".ts", ".js"]
  },
  output: {
    filename: "2sxc.api.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: []
};

module.exports = (env, argv) => {
  return configuration;
}
