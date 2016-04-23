# TypeScript development stack

[![Build Status](https://travis-ci.org/vaniocz/typescript-dev-stack.svg?branch=master)](https://travis-ci.org/vaniocz/typescript-dev-stack)
[![Dependency Status](https://david-dm.org/vaniocz/typescript-dev-stack.svg)](https://david-dm.org/vaniocz/typescript-dev-stack)
[![License](https://img.shields.io/badge/license-MIT-4D9283.svg)](https://github.com/vaniocz/typescript-dev-stack/blob/master/LICENSE)

Development stack for building modern web applications or libraries based on webpack using modified TypeScript 1.8 together with Babel (async/await and generators in ES5).

Uses TypeScript 1.8.9 with manually merged branch supporting ES7 bind operator and custom path resolving.
It tries current directory before trying `node_modules` and `src` while traversing up the directory tree.
Uses Mocha, Karma and Sinon for testing, includes jQuery and React with React Hot Loader and LESS for styling.

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

Check an example of [code coverage output](https://htmlpreview.github.io/?https://raw.githubusercontent.com/vaniocz/typescript-dev-stack/master/build/coverage/Karma/html/index.html).
It is remapped using my fork of [remap-istanbul](https://github.com/maryo/remap-istanbul) which contains some hacks
which enables remapping of Istanbul code coverage processed by webpack even for JetBrains IDEs.

![screenshot from Chrome](https://i.imgsafe.org/09409a2.png)
You should prefer Chrome since FF does not handle source maps correctly.

## IDE support
This stack was tested inside these editors:

### JetBrains IDEs
One of the best solution. JetBrains IDEs have some integrated plugins for running Karma and other tools.
Karma is configured to run tests in Electron by default because it covers both browser and server environment.
Even code coverage reporting remapped using Istanbul works quite well when configured properly since I wrote some hacks for it.
TypeScript works almost fine when custom compiler is set (File > Settings > Languages and Frameworks > TypeScript).
Depending on the version and settings you might also need to turn off JavaScript inspections for `.ts` files.
But it will still mark ES7 binding operator as an error even it works.
It also looks like it has sometimes problem while resolving files for autocompletion.

![screenshot from PHPStorm](https://i.imgsafe.org/29a49d7.png)

### Atom
One of the best solution thanks to wonderful plugin atom-typescript https://atom.io/packages/atom-typescript.
You just need to set it to use custom typescriptServices
(https://github.com/TypeStrong/atom-typescript/blob/master/docs/faq.md#user-content-can-i-use-a-custom-typescript-compiler)
and then it's probably needed to replace `.d.ts` files this plugin uses which are stored in
`.atom/packages/atom-typescript/node_modules/ntypescript/bin` inside your profile folder. There is also a great plugin
https://atom.io/packages/lcov-info for displaying code coverage. You just have to modify the path of the lcov this
plugin is searching in.
The resolving logic is in `.atom/packages/lcov-info/lib/coverage-lcov.coffee` inside your profile folder.

![screenshot from Atom](https://i.imgsafe.org/3376551.png)

### VS Code
Works fine when custom compiler is set (https://code.visualstudio.com/Docs/languages/typescript#_using-newer-typescript-versions).
You will also need to replace syntax definition grammar with one you can download here - https://github.com/maryo/TypeScript/blob/bindOperator-1.8/TypeScript.tmLanguage

### NetBeans
Also works almost fine after installing this plugin - https://github.com/maryo/TypeScript/blob/bindOperator-1.8/netbeanstypescript.nbm
It is a recompiled version of this plugin - http://plugins.netbeans.org/plugin/60605/typescript-editor
including the modified TypeScript compiler. But unfortunately there is a bug in the plugin.
It does not automatically import type definitions when importing javascripts having their `.d.ts` file set in it's `package.json`.
That's also why the `index.ts` file contains a reference to reflect-metadata type definition. You can safely remove it for other editors.

![screenshot from NetBeans](https://i.imgsafe.org/0a2c943.png)

### TODO
- Switch to Webpack2 (Tree-shaking)
