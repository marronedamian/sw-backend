"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarWarsService = void 0;
const common_1 = require("@nestjs/common");
const swapi_port_1 = require("../../domain/ports/swapi.port");
let StarWarsService = class StarWarsService {
    constructor(swapiAdapter) {
        this.swapiAdapter = swapiAdapter;
    }
    async getResource(resourceType, id) {
        const resource = await this.swapiAdapter
            .getResource(resourceType, id)
            .toPromise();
        if (!resource) {
            throw new Error(`Resource of type ${resourceType} with id ${id} not found`);
        }
        return resource;
    }
    async getAllResources(resourceType, page) {
        const resources = await this.swapiAdapter
            .getAllResources(resourceType, page)
            .toPromise();
        return resources ?? [];
    }
    async searchResource(resourceType, query) {
        const resources = await this.swapiAdapter
            .searchResource(resourceType, query)
            .toPromise();
        return resources ?? [];
    }
    async compareResources(resourceType, ids) {
        return Promise.all(ids.map((id) => this.getResource(resourceType, id)));
    }
};
exports.StarWarsService = StarWarsService;
exports.StarWarsService = StarWarsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(swapi_port_1.SWAPI_PORT)),
    __metadata("design:paramtypes", [Object])
], StarWarsService);
//# sourceMappingURL=star-wars.service.js.map