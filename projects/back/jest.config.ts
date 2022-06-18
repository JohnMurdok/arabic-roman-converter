import * as path from 'path';
import 'tsconfig-paths/register';
import { config } from 'dotenv-safe';

config({
    path: path.resolve(process.cwd(), '.env.test'),
});

export default {
    roots: ['<rootDir>/src/'],
    clearMocks: true,
    collectCoverage: false,
    collectCoverageFrom: [
        '!**/node_modules',
        'src/**/*.ts',
    ],
    moduleNameMapper: {
        '^@constants/(.*)$': '<rootDir>/src/constant/$1',
        '^@middlewares/(.*)$': '<rootDir>/src/middleware/$1',
        '^@services/(.*)$': '<rootDir>/src/service/$1',
    },
    testEnvironment: 'jest-environment-node',
    testRegex: '(test|spec)\\.ts?$',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
    },
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
};
