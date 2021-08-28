# A study of rushstack-eslint-patch


A study of [@rushstack/eslint-patch](https://www.npmjs.com/package/@rushstack/eslint-patch) based on: [https://github.com/worldzhao/rush-monorepo-example](https://github.com/worldzhao/rush-monorepo-example)

> keywords: rushstack-eslint-patch


## Features

- Structures
  - apps
  - features: Packages that do not need to be released, only reused in this Monorepo.
  - packages: Packages that need to be released.
- CRA and Umi app example
- ESlint/Prettier integrated (auto fix only work with VSCode)
- Git hooks: commit-msg and pre-commit with Rush autoinstallers
- Solve the Rush `succeeded with warnings` problem
- Support PNPM workspace

More 👉 [应用级 Monorepo 优化方案](https://github.com/worldzhao/blog/issues/9)


## How is pre-commit's eslint and prettier work?

When git's pre-commit hook run, it calls a rush command-line: 

```rush lint-staged```

The definition of this command can be found in `<root>/common/config/rush/comman-line.json`:

```
    {
      "name": "lint-staged",
      "commandKind": "global",
      "summary": "Used by the pre-commit Git hook. This command invokes the library called okonet/lint-staged to run eslint on staged changes.",
      "autoinstallerName": "rush-lint",
      "shellCommand": "lint-staged --debug --verbose"
    },
```

So when `rush lint-staged` is called, the above definition invoke the command: 

```
<root>/common/autoinstallers/rush-lint/node_module/.bin/lint-staged --debug --verbose
```

The above binary was installed by the npm packaged called `lint-staged` ([https://github.com/okonet/lint-staged](https://github.com/okonet/lint-staged) 

`lint-staged` will run commands defined in the configuration file: 

```<root>/.lintstagedrc```

The content of this configuration is: 

```
{
  "{apps,packages,features}/**/*.js?(x)": [
    "eslint --fix --color",
    "prettier --write"
  ],
  "{apps,packages,features}/**/*.ts?(x)": [
    "eslint --fix --color",
    "prettier --parser=typescript --write",
  ],
  "{apps,packages,features}/**/*.*.{css,less,md,json}": [
    "prettier --write"
  ]
}
```
In the configuration above you can see that it has configured lint-staged to run:

`eslint --fix --color` and `prettier --write` at various path match by the glob. 

#### Important question: 

Where does lint-staged find the binary for eslint and prettier? 
 
#### Answer:

```
<root>/common/autoinstallers/rush-lint/node_modules/.bin/eslint
<root>/common/autoinstallers/rush-lint/node_modules/.bin/prettier
```

Again this binary are installed by the autoinstaller `rush-lint`. 

When eslint run it will look for nearest `.eslintrc.js` (current directory or recursively walk up the parrent directory.

I have not investigate how prettier find its configuration, but my guess is it works similar to eslint. Currently there is a `.prettierrc` at the `<root>`. 




