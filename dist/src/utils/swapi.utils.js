"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractIdFromUrl = extractIdFromUrl;
exports.transformResource = transformResource;
function extractIdFromUrl(url) {
    const matches = url.match(/(\d+)\/$/);
    return matches ? matches[1] : "";
}
function transformResource(data, resourceType) {
    const id = extractIdFromUrl(data.url);
    return { ...data, id, resourceType };
}
//# sourceMappingURL=swapi.utils.js.map