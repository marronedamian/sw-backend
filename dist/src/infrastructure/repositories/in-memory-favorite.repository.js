"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryFavoriteRepository = void 0;
const common_1 = require("@nestjs/common");
let InMemoryFavoriteRepository = class InMemoryFavoriteRepository {
    constructor() {
        this.favorites = [];
        this.idCounter = 1;
    }
    async exists(userId, resourceType, resourceId) {
        return this.favorites.some((fav) => fav.userId === userId &&
            fav.resourceType === resourceType &&
            fav.resourceId === resourceId);
    }
    async create(favorite) {
        const newFavorite = { ...favorite, id: this.idCounter++ };
        this.favorites.push(newFavorite);
        return newFavorite;
    }
    async delete(id) {
        this.favorites = this.favorites.filter((fav) => fav.id !== id);
    }
    async findByUser(userId) {
        return this.favorites.filter((fav) => fav.userId === userId);
    }
    async findOne(id) {
        return this.favorites.find((fav) => fav.id === id) || null;
    }
};
exports.InMemoryFavoriteRepository = InMemoryFavoriteRepository;
exports.InMemoryFavoriteRepository = InMemoryFavoriteRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryFavoriteRepository);
//# sourceMappingURL=in-memory-favorite.repository.js.map