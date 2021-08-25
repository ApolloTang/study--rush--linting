require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: [
    // 'eslint-config-ali/typescript/node',  //<--- see [1]
    'eslint-config-egg/lib/rules/node',
  ],
};

// NOTE:
// [1]
// eslint-config-egg/lib/rules/node is not avaliable in 'eslint-config-ali'
// because it is specified as devDependency in it package.json.
//
