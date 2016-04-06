var context = require.context('./tests/client', true, /.tsx?$/);
context.keys().forEach(context);

module.exports = context;
