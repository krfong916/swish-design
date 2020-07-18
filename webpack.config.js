const path = require("path");

const componentsPath = path.resolve(__dirname, "src/");
const excludeNodeModules = path.resolve(__dirname, "node_modules/");

function getLoaders(loaders) {
  return Object.keys(loaders).map(name => loaders[name]);
}

const sassLoader = {
  test: /\.scss$/,
  include: componentsPath,
  use: ["style-loader", "css-loader", "sass-loader"],
};

const typescriptLoader = {
  test: /\.(ts|tsx)$/,
  include: componentsPath,
  exclude: excludeNodeModules,
  loader: require.resolve("babel-loader"),
  options: {
    presets: [["@babel/preset-react", { flow: false, typescript: true }]],
  },
};

const typescriptDocLoader = {
  test: /\.(ts|tsx)$/,
  include: componentsPath,
  exclude: excludeNodeModules,
  use: ["ts-loader", "react-docgen-typescript-loader"],
};

const devLoader = {
  sassLoader,
  typescriptLoader,
  typescriptDocLoader,
};

module.exports = {
  module: {
    rules: getLoaders(devLoader),
  },
};
