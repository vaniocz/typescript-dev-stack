# TypeScript development stack (HTML version)

[![Build Status](https://travis-ci.org/vaniocz/typescript-dev-stack.svg?branch=master)](https://api.travis-ci.org/vaniocz/typescript-dev-stack.svg?branch=html)
[![License](https://img.shields.io/badge/license-MIT-4D9283.svg)](https://github.com/vaniocz/typescript-dev-stack/blob/html/LICENSE)

Development stack for building modern web applications or libraries based on webpack using TypeScript 2.1.

Uses TypeScript 2.1, Mocha, Karma and Sinon for testing.
Includes html-loader for templates, SASS for styling.

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
