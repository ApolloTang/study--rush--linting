const path = require('path');
const fs = require('fs');
const execa = require('execa');

const dotGitPath = path.resolve(__dirname, '../../../.git');
if (!fs.existsSync(dotGitPath)) {
  console.log('[commit-lint.js (ERROR)] Invalid .git path; cannot git repo.');
  process.exit(1);
}

const pathToMonoRoot = path.dirname(dotGitPath);
const commitlintConfigScript = path.resolve(__dirname, './commitlint.config.js');
const commitlintBin = path.resolve(__dirname, './node_modules/.bin/commitlint');

const debug = true;
main(debug);

async function main(_debug) {
  try {
    // Executing bash command for commitlint
    // See: https://commitlint.js.org/#/guides-local-setup
    await execa(
      'bash',
      [commitlintBin, '--config', commitlintConfigScript, '--cwd', pathToMonoRoot, '--edit'],
      {
        stdio: 'inherit',
      },
    );
    debug && console.log('[commit-lint.js (MSG)] running commitlint ---> PASS');
  } catch (_e) {
    debug && console.log('[commit-lint.js (MSG)] running commitlint ---> FAIL');
    debug && console.log('[commit-lint.js (ERROR MSG)]', _e);
    process.exit(1);
  }
}
