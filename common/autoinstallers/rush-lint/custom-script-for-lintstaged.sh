#! /bin/sh

#
# This script is called my lint-staged by specified it in
# <monorepo-root>/.lintstagedrc.
#
# Since lint-staged can only invoke script in "./node_modules/.bin/",
# we copy this file into "./node_modules/.bin/" via npm postinstall
# (as specified in the scripts.postinstall field in package.json).
#

basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")
echo "--------------------------------------------------"
echo '1 Executing scripts (start): <root-mono>common/autoinstallers/rush-lint/custom-script-for-lintstaged.sh'
echo "2 The execution context (pwd) is: $(pwd)"
echo "3 args: $@"
echo "4 basedir: $basedir",
echo '5 run node script now'
node "$basedir/../../some-script.js" "$@"
echo '6 Executing scripts (end): <root-mono>common/autoinstallers/rush-lint/custom-script-for-lintstaged.sh'

