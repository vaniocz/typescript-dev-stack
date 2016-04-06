# webstack
Webstack using modified TypeScript 1.8 together with Babel (async/await and generators in ES5)

Uses TypeScript 1.8.9 with manually merged ES7 bind operator and custom path resolving - tries current directory before node_modules and src after while traversing up the directory tree).

- `npm run build` - build production bundle
- `npm test` - runs unit tests using mocha
- `npm start` - starts webpack dev server
