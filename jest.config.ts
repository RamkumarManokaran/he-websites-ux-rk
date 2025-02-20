import type { Config } from "jest";
import nextJest from "next/jest.js";

// Create Jest configuration for multiple Next.js apps
const createJestConfig = nextJest({
  dir: "./apps/whatuni",
});

// Add custom config to Jest for multiple apps
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^react-dnd$": "react-dnd/dist/cjs",
    "^react-dnd-html5-backend$": "react-dnd-html5-backend/dist/cjs",
    "^dnd-core$": "dnd-core/dist/cjs",
    "^@packages/(.*)$": "<rootDir>/packages/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  // Enable coverage collection
  // collectCoverage: true,

  // Collect coverage from both apps
  collectCoverageFrom: [
    "apps/whatuni/src/**/*.{ts,tsx}",
    "apps/pgs/src/**/*.{ts,tsx}",
    "packages/shared-components/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/.open-next/**",
    "!**/.next/**",
    "!**/jest.config.ts",
    "!**/next-env.d.ts",
    "!**/tailwind.config.ts ",
    // Exclude Jest config file
  ],

  // Output coverage results to the 'coverage' directory
  coverageDirectory: "<rootDir>/coverage",

  // Configure the reporters for coverage results
  coverageReporters: ["json", "lcov", "text", "clover"],

  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transformIgnorePatterns: [
    "/node_modules/",
    "/node_modules/(?!swiper).+\\.mjs$",
    "node_modules/(?!(your-custom-modules)/)",
    "node_modules/(?!" +
      [
        "node-fetch",
        "fetch-blob",
        "data-uri-to-buffer",
        "jest-runtime",
        "formdata-polyfill",
      ].join("|") +
      ")",
    "node_modules/(?!(swiper)/)",
    "/node_modules/(?!(swiper|other-module-to-transform)/)",
    // Ensure swiper (and any other ECMAScript modules) are processed by Babel
  ],

  // Optional: Specify different test setup files if needed
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  //extensionsToTreatAsEsm: [".ts", ".tsx", ".js", ".jsx"], // Treat TypeScript and JavaScript as ESM
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};

// Export the jest config created by nextJest along with the custom config
export default createJestConfig(config);
