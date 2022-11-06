module.exports = {
  ignore: ['dist', 'node_modules'],
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
};
