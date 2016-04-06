var context = require.context('./tests', true, /.tsx?$/);
context.keys().forEach(context);

module.exports = context;
