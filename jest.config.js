// jest.config.js
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/app/$1', // Remix için gerekli
  },
    setupFilesAfterEnv: ['<rootDir>/test/setup-test-env.ts'],
    transformIgnorePatterns: [
        "/node_modules/(?!swiper|ssr-window|dom7).+\\.js$",
        "^.+\\.module\\.(css|sass|scss)$",
    ],
    moduleFileExtensions: [
        "js",
        "jsx",
        "ts",
        "tsx",
        "json",
        "node"
    ]
};