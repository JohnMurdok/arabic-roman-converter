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
        '^#test/(.*)$': '<rootDir>/src/test/$1',
    },
    testEnvironment: 'jest-environment-node',
    testRegex: '(test|spec)\\.ts?$',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
    },
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
};
