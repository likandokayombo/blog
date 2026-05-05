const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@app/(.*)$": "<rootDir>/app/$1",
    "^@components/(.*)$": "<rootDir>/app/components/$1",
    "^@features/(.*)$": "<rootDir>/app/features/$1",
    "^@lib/(.*)$": "<rootDir>/lib/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
