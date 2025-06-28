"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCacheKey = generateCacheKey;
function generateCacheKey(resourceType, id, search) {
    if (id) {
        return `swapi:${resourceType}:${id}`;
    }
    if (search) {
        return `swapi:${resourceType}:search:${search}`;
    }
    return `swapi:${resourceType}:list`;
}
//# sourceMappingURL=cache.utils.js.map