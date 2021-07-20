//prettier-ignore
module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:react-hooks/recommended", // Uses the recommended rules from @eslint-plugin-react-hooks
    "plugin:@typescript-eslint/recommended" // Uses the recommended rules from @typescript-eslint
  ],
  "rules": {
    // turn on errors for missing imports
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "prefer-const": "off"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "jsx": true,
    "ecmaVersion": 12,
  }
}

// Multiple tsconfigs (Useful for monorepos)

// use a glob pattern
// "project": "packages/*/tsconfig.json",

// use an array
// "project": [
//   "packages/module-a/tsconfig.json",
//   "packages/module-b/tsconfig.json"
// ],

// use an array of glob patterns
// "project": [
//   "packages/*/tsconfig.json",
//   "other-packages/*/tsconfig.json"
// ]
