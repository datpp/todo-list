module.exports = {
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/.next/**',
        '!**/node_modules/**',
        '!**/tests/**',
        '!**/coverage/**',
        '!*.config.js',
        '!*.d.ts'
    ],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    },
    setupFiles: [
        '<rootDir>/tests/test-pre-setup.js',
    ],
    setupFilesAfterEnv: [
        '<rootDir>/tests/test-setup.js',
        '<rootDir>/tests/test-shim.js',
    ],
    testMatch: [
        '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    testPathIgnorePatterns: [
        '/.next/',
        '/node_modules/',
        '/tests/',
        '/coverage/'
    ],
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
    },
};
