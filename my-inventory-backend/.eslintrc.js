module.exports = {
  extends: ['../.eslintrc.json'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', './']
      }
    }
  },
  ignorePatterns: ['*.generated.ts', '__snapshots__/**']
};
