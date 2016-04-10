# TypeScript development stack
Development stack for building modern web applications or libraries based on webpack using modified TypeScript 1.8 together with Babel (async/await and generators in ES5).

Uses TypeScript 1.8.9 with manually merged branch supporting ES7 bind operator and custom path resolving.
It tries current directory before trying `node_modules` and `src` while traversing up the directory tree.

- `npm install` - installs all dependencies
- `npm start` - starts webpack dev server (hot module replacement enabled)
- `npm test` - runs all tests
- `npm run build` - builds bundle for production
- `npm run build:dev` - builds bundle for development
- `npm run karma` - runs tests in `tests/client` directory using karma & mocha in PhantomJS
- `npm run karma:all` - runs tests in `tests/client` directory using karma & mocha in all detected browsers
- `npm run mocha` - runs tests in `tests/server` directory using mocha in Node.js environment

Don't forget it is possible to pass arguments to these commands like `npm run mocha -- --watch`.

![screenshot from Chrome](https://i.imgsafe.org/09409a2.png)
You should prefer Chrome since FF does not handle source maps correctly.

## IDE support
This stack was tested inside these editors:

### Atom
Probably the best solution so far thanks to wonderful plugin atom-typescript https://atom.io/packages/atom-typescript.
You just need to set it to use custom typescriptServices (https://github.com/TypeStrong/atom-typescript/blob/master/docs/faq.md#user-content-can-i-use-a-custom-typescript-compiler)
and then it's probably needed to replace `.d.ts` files this plugin uses which are stored somewhere in your profile.

### VS Code
Works fine when custom compiler is set (https://code.visualstudio.com/Docs/languages/typescript#_using-newer-typescript-versions).
You will also need to replace syntax definition grammar with one you can download here - https://github.com/maryo/TypeScript/blob/bindOperator-1.8/TypeScript.tmLanguage

### JetBrains IDEs
Works almost fine when custom compiler is set (File > Settings > Languages and Frameworks > TypeScript).
Depending on the version and settings you might also need to turn off JavaScript inspections for `.ts` files.
But it will still mark ES7 binding operator as an error even it works.

![screenshot from PHPStorm](https://i.imgsafe.org/0b1cfe5.png)

### NetBeans
Also works almost fine after installing this plugin - https://github.com/maryo/TypeScript/blob/bindOperator-1.8/netbeanstypescript.nbm
It is a recompiled version of this plugin - http://plugins.netbeans.org/plugin/60605/typescript-editor
including the modified TypeScript compiler. But unfortunately there is a bug in the plugin.
It does not automatically import type definitions when importing javascripts having their `.d.ts` file set in it's `package.json`.
That's also why the `index.ts` file contains a reference to reflect-metadata type definition. You can safely remove it for other editors.

![screenshot from NetBeans](https://i.imgsafe.org/0a2c943.png)

### TODO
- Code coverage using Istanbul
- React and JSX examples
- TSLint
- Switch to Webpack2 (Tree-shaking)
