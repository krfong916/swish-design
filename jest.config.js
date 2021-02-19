module.exports = {
  // Glob pattern matcher to discover .test and .spec .ts and .tsx files
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],

  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],

  // The package 'identity-obj-proxy assumes that our css modules contain an object with css classnames,
  // it doesn't support ability to export values and constants
  // We use 'jest-transform-css' because our scss files will get transpiled into js
  // This package is intended to be used in jsdom env. Our components import css files
  // therefore the css will get loaded into the jsdom env - we need a way to interpret it
  // for our tests to run in general, and should we perform visual regression testing in Jest
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "jest-transform-css",
  },
  // The Typescript processor for jest which allows jest to transpile Typescript on the fly
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
