// This script run after npm package.json finished installing
const execa = require('execa')

;(async () => {
  [
    // './custom-script-for-rush-global-command-in-autoinstaller.sh',
    './custom-script-for-lintstaged.sh',
  ].forEach( async (_f) => { await makeNpmExec(_f) })
})()

;async function makeNpmExec (_file) {
  try {
    await execa('cp', [_file, './node_modules/.bin/'])
    await execa('chmod', ['744', `./node_modules/.bin/${_file}`])
    console.log(`[post-install-script.js] Installed npm execute-able: \'${_file}\'}`)
  } catch (_e) {
    console.log('[post-install-script.js] Error copy file')
    console.log(_e.stderr)
  }
}
