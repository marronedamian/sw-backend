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
exports.FavoriteRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const favorite_entity_1 = require("../entities/favorite.entity");
let FavoriteRepository = class FavoriteRepository {
    constructor(ormRepository) {
        this.ormRepository = ormRepository;
    }
    async create(favorite) {
        const newFavorite = this.ormRepository.create(favorite);
        await this.ormRepository.save(newFavorite);
        return this.toDomain(newFavorite);
    }
    async delete(id) {
        await this.ormRepository.delete(id);
    }
    async findByUser(userId) {
        const favorites = await this.ormRepository.find({ where: { userId } });
        return favorites.map(this.toDomain);
    }
    async findOne(id) {
        const favorite = await this.ormRepository.findOne({ where: { id } });
        return favorite ? this.toDomain(favorite) : null;
    }
    async exists(userId, resourceType, resourceId) {
        const count = await this.ormRepository.count({
            where: { userId, resourceType, resourceId },
        });
        return count > 0;
    }
    toDomain(entity) {
        return {
            id: entity.id,
            userId: entity.userId,
            resourceType: entity.resourceType,
            resourceId: entity.resourceId,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
};
exports.FavoriteRepository = FavoriteRepository;
exports.FavoriteRepository = FavoriteRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(favorite_entity_1.FavoriteEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FavoriteRepository);
//# sourceMappingURL=favorite.repository.js.map