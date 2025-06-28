"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    rootDir: "test",
    moduleFileExtensions: ["js", "json", "ts"],
    testRegex: ".*\\.spec\\.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    testEnvironment: "node",
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map