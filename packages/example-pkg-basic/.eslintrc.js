module.exports = {
  root: true,
  extends: [
    '@rush-monorepo/eslint-config/typescript/node',
    '@rush-monorepo/eslint-config/prettier',
  ],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 2015,
  },
};
