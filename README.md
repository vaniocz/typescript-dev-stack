# webstack
Webstack using modified TypeScript 1.8 together with Babel (async/await and generators in ES5)

Uses TypeScript 1.8.9 with manually merged ES7 bind operator and custom path resolving - tries current directory before node_modules and src after while traversing up the directory tree).

- `npm run build` - build production bundle
- `npm run mocha` - run server-side tests in `tests/server` directory using mocha in node environment
- `npm run karma` - run client-side tests in `tests/client` directory using karma & mocha in browser environment
- `npm test` - run both server-side and client-side tests
- `npm start` - starts webpack dev server
