require('@babel/register')({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
        },
      },
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      '@babel/plugin-proposal-decorators', {
        legacy: true
      }
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true
      }
    ]
  ],
  extensions: ['.js', '.jsx', '.ts', '.tsx']
})

console.log('Running=>', process.argv[2])
require(process.argv[2])
