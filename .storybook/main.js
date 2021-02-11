const path = require("path");
module.exports = {
  stories: ["../src/**/*.stories.tsx", "../src/**/*.stories.js"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "@storybook/addon-knobs",
    "@storybook/addon-storysource",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
      },
    },
  ],
  webpackFinal: async config => {
    config.module.rules.push(
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, "../src"),
        use: [
          require.resolve("ts-loader"),
          {
            loader: require.resolve("react-docgen-typescript-loader"),
            options: {
              // We need our stories to display types from outside each indiv. story
              tsconfigPath: path.resolve(__dirname, "../tsconfig.json"),
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, "../src"),
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    );
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};
