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
exports.StarWarsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const star_wars_service_1 = require("../../core/application/services/star-wars.service");
let StarWarsController = class StarWarsController {
    constructor(starWarsService) {
        this.starWarsService = starWarsService;
    }
    compareResources(resourceType, ids) {
        if (!ids) {
            throw new common_1.BadRequestException('Parámetro "ids" es requerido.');
        }
        const parsedIds = ids
            .split(",")
            .map((id) => parseInt(id.trim(), 10))
            .filter((id) => !isNaN(id));
        if (parsedIds.length === 0) {
            throw new common_1.BadRequestException("Debe proporcionar al menos un ID válido.");
        }
        return this.starWarsService.compareResources(resourceType, parsedIds);
    }
    async getAll(resourceType, page = 1, search) {
        if (search) {
            return this.starWarsService.searchResource(resourceType, search);
        }
        return this.starWarsService.getAllResources(resourceType, page);
    }
    async getOne(resourceType, id) {
        return this.starWarsService.getResource(resourceType, id);
    }
};
exports.StarWarsController = StarWarsController;
__decorate([
    (0, common_1.Get)(":resourceType/compare"),
    (0, swagger_1.ApiOperation)({ summary: "Comparar recursos por IDs" }),
    (0, swagger_1.ApiParam)({
        name: "resourceType",
        enum: ["people", "films", "starships", "planets"],
        description: "Tipo de recurso a comparar",
    }),
    (0, swagger_1.ApiQuery)({
        name: "ids",
        required: true,
        example: "2,5",
        description: "IDs separados por coma para comparar recursos",
    }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Param)("resourceType")),
    __param(1, (0, common_1.Query)("ids")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], StarWarsController.prototype, "compareResources", null);
__decorate([
    (0, common_1.Get)(":resourceType"),
    (0, swagger_1.ApiOperation)({ summary: "Listar recursos o buscar por nombre" }),
    (0, swagger_1.ApiParam)({
        name: "resourceType",
        enum: ["people", "films", "starships", "planets"],
        description: "Tipo de recurso",
    }),
    (0, swagger_1.ApiQuery)({
        name: "page",
        required: false,
        example: 1,
        description: "Número de página para paginación",
    }),
    (0, swagger_1.ApiQuery)({
        name: "search",
        required: false,
        example: "Luke",
        description: "Término de búsqueda",
    }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Param)("resourceType")),
    __param(1, (0, common_1.Query)("page")),
    __param(2, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], StarWarsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(":resourceType/:id"),
    (0, swagger_1.ApiOperation)({ summary: "Obtener un recurso por ID" }),
    (0, swagger_1.ApiParam)({
        name: "resourceType",
        enum: ["people", "films", "starships", "planets"],
        description: "Tipo de recurso",
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        type: Number,
        description: "ID del recurso",
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)("resourceType")),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], StarWarsController.prototype, "getOne", null);
exports.StarWarsController = StarWarsController = __decorate([
    (0, swagger_1.ApiTags)("star-wars"),
    (0, common_1.Controller)("star-wars"),
    __metadata("design:paramtypes", [star_wars_service_1.StarWarsService])
], StarWarsController);
//# sourceMappingURL=star-wars.controller.js.map