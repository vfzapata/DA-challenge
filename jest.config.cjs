/** @type {import('jest').Config} */
module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts?(x)'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.test.json',
      },
    ],
  },
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/src/test/styleMock.cjs',
    '\\.(png)$': '<rootDir>/src/test/fileMock.cjs',
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
}
