"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const favorites_controller_1 = require("../../infrastructure/controllers/favorites.controller");
const favorites_service_1 = require("../../core/application/services/favorites.service");
const favorite_repository_1 = require("../../infrastructure/repositories/favorite.repository");
const favorite_entity_1 = require("../../infrastructure/entities/favorite.entity");
const favorite_repository_port_1 = require("../../core/domain/ports/favorite-repository.port");
let FavoritesModule = class FavoritesModule {
};
exports.FavoritesModule = FavoritesModule;
exports.FavoritesModule = FavoritesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([favorite_entity_1.FavoriteEntity])],
        controllers: [favorites_controller_1.FavoritesController],
        providers: [
            favorites_service_1.FavoritesService,
            {
                provide: favorite_repository_port_1.FavoriteRepositoryPort,
                useClass: favorite_repository_1.FavoriteRepository,
            },
        ],
        exports: [favorites_service_1.FavoritesService],
    })
], FavoritesModule);
//# sourceMappingURL=favorites.module.js.map