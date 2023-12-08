/** @type {import('ts-jest').JestConfigWithTsJest} */

// const createJestConfig = nextJest();

module.exports = {
  preset: "ts-jest",
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // moduleNameMapper: {
  //   "@/(.*)$": "<rootDir>/$1"
  // }
};