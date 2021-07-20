const path = require("path");
const webpack = require("webpack");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: "./index.ts",
  devtool: "eval",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: ".tsconfig.release.json",
          },
        },
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "shared"),
          path.resolve(__dirname, "stories"),
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        include: /components/,
        exclude: /node_modules/,
        use: [MiniCSSExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "lib"),
    libraryTarget: "commonjs2",
  },
  plugins: [new MiniCSSExtractPlugin(), new webpack.ProgressPlugin()],
};
