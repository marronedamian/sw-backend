"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapiAdapter = void 0;
const https = __importStar(require("https"));
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let SwapiAdapter = class SwapiAdapter {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
    }
    getBaseUrl() {
        const baseUrl = this.configService.get("SWAPI_BASE_URL");
        if (!baseUrl) {
            throw new Error("SWAPI baseUrl is not defined in configuration");
        }
        return baseUrl;
    }
    getHttpsAgent() {
        const isDev = this.configService.get("NODE_ENV") !== "production";
        return isDev ? new https.Agent({ rejectUnauthorized: true }) : undefined;
    }
    getResource(resourceType, id) {
        const url = `${this.getBaseUrl()}/${resourceType}/${id}/`;
        return this.httpService
            .get(url, {
            httpsAgent: this.getHttpsAgent(),
        })
            .pipe((0, rxjs_1.map)((res) => this.transformResource(res.data, resourceType)), (0, rxjs_1.catchError)((err) => {
            console.error("Error in getResource:", err.message);
            throw err;
        }));
    }
    getAllResources(resourceType, page) {
        const url = `${this.getBaseUrl()}/${resourceType}/?page=${page}`;
        return this.httpService
            .get(url, {
            httpsAgent: this.getHttpsAgent(),
        })
            .pipe((0, rxjs_1.map)((res) => {
            const data = res.data;
            const results = Array.isArray(data)
                ? data
                : Array.isArray(data?.results)
                    ? data.results
                    : [];
            return results.map((item) => this.transformResource(item, resourceType));
        }), (0, rxjs_1.catchError)((err) => {
            console.error("Error in getAllResources:", err.message);
            return (0, rxjs_1.of)([]);
        }));
    }
    searchResource(resourceType, query) {
        const url = `${this.getBaseUrl()}/${resourceType}/?search=${query}`;
        return this.httpService
            .get(url, {
            httpsAgent: this.getHttpsAgent(),
        })
            .pipe((0, rxjs_1.map)((res) => {
            const results = res.data?.results;
            if (!Array.isArray(results))
                return [];
            return results.map((item) => this.transformResource(item, resourceType));
        }), (0, rxjs_1.catchError)((err) => {
            console.error("Error in searchResource:", err.message);
            return (0, rxjs_1.of)([]);
        }));
    }
    transformResource(data, resourceType) {
        const id = this.extractIdFromUrl(data.url);
        return { ...data, id, resourceType };
    }
    extractIdFromUrl(url) {
        const segments = url.split("/").filter(Boolean);
        return segments.at(-1) || "";
    }
};
exports.SwapiAdapter = SwapiAdapter;
exports.SwapiAdapter = SwapiAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], SwapiAdapter);
//# sourceMappingURL=swapi.adapter.js.map