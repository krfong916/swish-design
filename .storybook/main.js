const path = require("path")
module.exports = {
  webpackFinal: async config => {
    config.module.rules.push(
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [["react-app", {flow: false, typescript: true}]],
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {loader: require.resolve("ts-loader")},
          {loader: require.resolve("react-docgen-typescript-loader")},
        ],
      },
    )

    config.resolve.extensions.push(".ts", ".tsx")

    return config
  },
  stories: ["../src/**/*.stories.tsx", "../src/**/*.stories.js"],
}
