const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "swish-design.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs2",
    library: "swishDesign",
  },
  plugins: [new MiniCssExtractPlugin(), new webpack.ProgressPlugin()],
};
