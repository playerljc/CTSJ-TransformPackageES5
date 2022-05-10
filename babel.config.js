const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'entry',
      modules: 'auto',
      corejs: { version: 3, proposals: true },
    },
  ]
];

const plugins = [

];

module.exports = { presets, plugins };
