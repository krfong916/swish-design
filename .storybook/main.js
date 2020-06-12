const swishConfig = require("../webpack.config")
module.exports = {
  stories: ["../src/**/*.stories.tsx", "../src/**/*.stories.js"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "@storybook/addon-docs",
    "@storybook/addon-knobs",
    "@storybook/addon-storysource",
  ],
  webpackFinal: async config => {
    config.module.rules.push(...swishConfig.module.rules)
    config.resolve.extensions.push(".ts", ".tsx")
    return config
  },
}
