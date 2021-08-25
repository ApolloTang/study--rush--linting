/* xxxxeslint-disable */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    '@rush-monorepo/eslint-config/myconfig',
    // '@rush-monorepo/eslint-config/typescript/react',
    '@rush-monorepo/eslint-config/prettier',
  ],

  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 2015,
  },
  // rules: {
  //   'no-console': 'warn',
  // },
};
