// This script run after npm package.json finished installing
const execa = require('execa')

;(async () => {
  try {
    // await execa('echo', 'xxx <root-mono>/common/autoinstaller/rush-lint/some-test-script.js called').stdout.pipe(process.stdout)
    console.log('done xxx xx')
    process.exit()
  } catch (_e) {
  }
})()

