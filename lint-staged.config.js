module.exports = {
  linters: {
    "**/*.+(js|css|json)": ["eslint --fix", "prettier --write", "git add"],
  },
};
