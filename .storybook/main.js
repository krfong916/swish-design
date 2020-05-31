const path = require("path")
module.exports = {
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
    })
    return config
  },
  stories: ["../src/**/*.stories.js"],
}
