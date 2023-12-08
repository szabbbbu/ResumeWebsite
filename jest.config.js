/** @type {import('ts-jest').JestConfigWithTsJest} */

// const createJestConfig = nextJest();

module.exports = {
  rootDir: "./",
  preset: "ts-jest",
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // moduleNameMapper: {
  //   "@/(.*)$": "<rootDir>/$1"
  // }
};