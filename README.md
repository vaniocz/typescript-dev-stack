# TypeScript development stack

[![Build Status](https://travis-ci.org/vaniocz/typescript-dev-stack.svg?branch=master)](https://travis-ci.org/vaniocz/typescript-dev-stack)
[![Dependency Status](https://david-dm.org/vaniocz/typescript-dev-stack.svg)](https://david-dm.org/vaniocz/typescript-dev-stack)
[![License](https://img.shields.io/badge/license-MIT-4D9283.svg)](https://github.com/vaniocz/typescript-dev-stack/blob/master/LICENSE)

Development stack for building modern web applications or libraries based on webpack using TypeScript 2.1.

Uses TypeScript 2.1.
It tries current directory before trying `node_modules` and `src` while traversing up the directory tree.
Uses Mocha, Karma and Sinon for testing, includes jQuery and React with React Hot Loader and SASS for styling.

- `npm install` - installs all dependencies
- `npm start` - starts webpack dev server (hot module replacement enabled)
- `npm test` - runs all tests using Karma & Mocha in Electron and also tests inside `tests/server` directory using Mocha in Node.js environment
- `npm run lint -s` - validates all TypeScript files using tslint
- `npm run build -s` - builds bundle for production
- `npm run build:dev -s` - builds bundle for development
- `npm run karma -s` - runs all tests using Karma & Mocha in Electron
- `npm run karma:browser:all -s` - runs tests inside `tests/browser` directory using Karma & Mocha in all detected browsers
- `npm run karma:coverage -s` - runs all tests using Karma & Mocha in Electron and outputs coverage
- `npm run karma:browser:coverage -s` - runs tests inside `tests/browser` directory using Karma & Mocha in Electron and outputs coverage
- `npm run karma:server:coverage -s` - runs tests inside `tests/server` directory using Karma & Mocha in Electron and outputs coverage
- `npm run karma -s -- --grep browser/browserTest\.ts` - runs `tests/browser/browserTest.ts` test file using Karma & Mocha in Electron
- `npm run mocha -s` - runs tests inside `tests/server` directory using Mocha in Node.js environment
- `npm run mocha:coverage -s` - runs tests inside `tests/server` directory using Mocha in Node.js environment and outputs coverage
- `GREP=serverTest\.ts && npm run Mocha -s` - runs `tests/server/serverTest.ts` test file using Mocha in Node.js environment

Check an example of [code coverage output](https://htmlpreview.github.io/?https://raw.githubusercontent.com/vaniocz/typescript-dev-stack/master/build/coverage/karma/html/index.html).
It also contains few hacks to enable remapping of Istanbul code coverage processed by webpack even for JetBrains IDEs.

![screenshot from Chrome](http://i.imgsafe.org/6a90565324.png)
You should prefer Chrome since FF does not handle source maps correctly.

## IDE support
This stack was tested inside these editors:

### JetBrains IDEs
One of the best solution. JetBrains IDEs have some integrated plugins for running Karma and other tools.
Karma is configured to run tests in Electron by default because it covers both browser and server environment.
Even code coverage reporting remapped using Istanbul works quite well when configured properly since I wrote some hacks for it.
Depending on the version and settings you might also need to turn off JavaScript inspections for `.ts` files.
It also looks like it has sometimes problem while resolving files for autocompletion.

![screenshot from PHPStorm](http://i.imgsafe.org/6a9067548e.png)

### Atom
One of the best solutions thanks to wonderful plugin atom-typescript https://atom.io/packages/atom-typescript.
There is also a great plugin https://atom.io/packages/lcov-info for displaying code coverage.
You just have to modify the path of the lcov this plugin is searching in.
The resolving logic is in `.atom/packages/lcov-info/lib/coverage-lcov.coffee` inside your profile folder.

![screenshot from Atom](http://i.imgsafe.org/6a9041f382.png)

### VS Code
Works fine.
