/** @type {import('ts-jest').JestConfigWithTsJest} */

// const createJestConfig = nextJest();

module.exports = {
  rootDir: "./",
  preset: "ts-jest",
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
  //NEXT USES 'preserve', we need 'react'
    '^.+\\.(t|j)sx?$': 
      ['ts-jest',
      {
        tsconfig: {jsx: 'react'}
      },
    ],
  },
};