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

