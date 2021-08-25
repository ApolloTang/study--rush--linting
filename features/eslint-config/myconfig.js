/* xxxeslint-disable */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,

  extends: ['eslint:recommended', 'plugin:jest/recommended', 'plugin:jsx-a11y/recommended'],

  plugins: ['@typescript-eslint', 'simple-import-sort'],

  settings: {
    jest: {
      version: 27, // <--- https://github.com/microsoft/vscode-eslint/issues/1145#issuecomment-780130183
    },

    // Apply special parsing for TypeScript files
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.d.ts'],
    },
    // Append 'ts' extensions to 'import/resolver' setting
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js', '.ts', '.json'],
      },
    },
    // Append 'ts' extensions to 'import/extensions' setting
    'import/extensions': ['.js', '.ts', '.mjs'],
  },

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    createDefaultProgram: true, //<----- https://stackoverflow.com/a/64488474/3136861
    project: './tsconfig.json',
    ecmaVersion: 2019,
    sourceType: 'module',
  },

  rules: {
    'no-console': 'error',
    'no-undef': 'off', // https://github.com/eslint/typescript-eslint-parser/issues/437
    'no-unused-vars': 'warn',

    // Team-agreed rules
    'no-implicit-coercion': 'error',

    // Jest
    'jest/expect-expect': 'warn',

    // Imports
    'no-duplicate-imports': 'warn',
    'sort-imports': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports
          ['^\\u0000'],
          // Node.js builtins
          // [`^(${require('module').builtinModules.join('|')})(/|$)`],
          // Packages. `react` related packages come first
          ['^react', '^@?\\w'],
          // Internal packages
          ['^(@myscope|@rewardops)(/.*|$)'],
          // TS path imports and relative imports. Put same-folder imports and `.` last
          [
            '^(~.+)(/.*|$)',
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
          ],
          // Style imports (just in case)
          ['^.+\\.s?css$'],
        ],
      },
    ],
  },

  overrides: [
    // TypeScript files
    {
      files: ['**/*.{ts,tsx}'],

      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
      ],

      rules: {
        // @typescript-eslint
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/class-name-casing': [
          'off',
          {
            allowUnderscorePrefix: true,
          },
        ],
        // Without the following, you will get inconsistent behaviour compared to barebone @typescript-eslint
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        // Allow promise to resolve without value (eg. blocking the flow of an execution)
        '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/type-annotation-spacing': 'off',

        // FIXME: Formik has an unbound method typing issue: https://github.com/formium/formik/issues/2589
        // we can remove the following when the above is resolved
        '@typescript-eslint/unbound-method': 'warn',

        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/restrict-template-expressions': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/ban-types': 'warn',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-floating-promises': 'warn',

        /**
         *  TODO to be discussed with team members and refactor as a technical debt.
         *
         *  // standardize the use of type assertion style across the codebase
         *  // https://github.com/typescript-eslint/typescript-eslint/blob/v2.0.0/packages/eslint-plugin/docs/rules/consistent-type-assertions.md
         *  // guides/typescript/README.md:25
         *  '@typescript-eslint/consistent-type-assertions': [
         *    assertionStyle: 'as',
         *  ],
         *
         *  // enforce certain naming-conventions i.e. types are Pascal cased
         *  // https://github.com/typescript-eslint/typescript-eslint/blob/v2.29.0/packages/eslint-plugin/docs/rules/naming-convention.md
         *  '@typescript-eslint/naming-convention': [
         *    'error',
         *    {
         *      selector: 'default',
         *      format: ['camelCase'],
         *    },
         *    {
         *      selector: 'variableLike',
         *      format: ['camelCase'],
         *    },
         *    {
         *      selector: 'variable',
         *      format: null,
         *    },
         *    {
         *      selector: 'property',
         *      // allow mixed i.e. dispatch_clearTicketNumber
         *      format: null,
         *    },
         *    {
         *      selector: 'enumMember',
         *      // TODO: re-enable or discard this rule during tech debt fixes: snake_case is incompatible with names like action-names.ts's page_productDetail_etc (it has to be lowercase)
         *      // format: ['PascalCase', 'snake_case'],
         *      format: null,
         *    },
         *    {
         *      selector: 'parameter',
         *      format: null,
         *    },
         *    {
         *      selector: 'method',
         *      format: null,
         *    },
         *    {
         *      selector: 'typeLike',
         *      format: ['PascalCase'],
         *    },
         *    {
         *      selector: 'typeParameter',
         *      format: ['PascalCase'],
         *    },
         *    {
         *      // TODO: If re-enabled, remove guides/typescript/README.md:11
         *      selector: 'interface',
         *      format: ['PascalCase'],
         *      custom: { regex: '^I[A-Z]', match: false },
         *    },
         *  ],
         **/
      },
    },
    // JavaScript files
    {
      files: ['**/*.{js,jsx}'],

      extends: ['plugin:prettier/recommended'],
    },
    // Config files
    {
      files: ['*.config.js'],
      env: {
        node: true,
      },
    },
  ],
};
