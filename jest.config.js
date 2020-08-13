module.exports = {
  verbose: true,
  clearMocks: true,
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],

  transformIgnorePatterns: [
    "<rootDir>/(node_modules)/"
  ],

  // The test environment that will be used for testing
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
}
