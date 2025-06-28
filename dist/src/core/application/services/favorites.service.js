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
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const favorite_repository_port_1 = require("../../domain/ports/favorite-repository.port");
let FavoritesService = class FavoritesService {
    constructor(favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }
    async addFavorite(userId, resourceType, resourceId) {
        const exists = await this.favoriteRepository.exists(userId, resourceType, resourceId);
        if (exists) {
            throw new Error("Favorite already exists");
        }
        return this.favoriteRepository.create({ userId, resourceType, resourceId });
    }
    async removeFavorite(id) {
        return this.favoriteRepository.delete(id);
    }
    async getUserFavorites(userId) {
        return this.favoriteRepository.findByUser(userId);
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(favorite_repository_port_1.FavoriteRepositoryPort)),
    __metadata("design:paramtypes", [Object])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map