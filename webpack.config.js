const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  devServer: {
    static: "./dist",
    open: {
      app: {
        name: "google chrome",
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
