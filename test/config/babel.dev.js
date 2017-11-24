plugins: [
    'babel-plugin-syntax-trailing-function-commas',
    'babel-plugin-transform-class-properties',
    'babel-plugin-transform-object-rest-spread'
].map(require.resolve).concat([
    [require.resolve('babel-plugin-transform-runtime'), {
        helpers: false,
        polyfill: false,
        regenerator: true
    }]
]).concat([
    [require.resolve('babel-plugin-antd'), {
        style: "css",
    }]
])