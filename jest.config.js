module.exports = {
  setupFiles: [
    '<rootDir>/src/__test__/setupTests.js',
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/__mocks__/styleMock.js'
  }
};
