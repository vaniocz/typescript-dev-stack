const context = require.context('./client', true, /.tsx?$/);
context.keys().forEach(context);

export default context;
