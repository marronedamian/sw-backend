import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavoritesController } from "../../infrastructure/controllers/favorites.controller";
import { FavoritesService } from "../../core/application/services/favorites.service";
import { FavoriteRepository } from "../../infrastructure/repositories/favorite.repository";
import { FavoriteEntity } from "../../infrastructure/entities/favorite.entity";
import { FavoriteRepositoryPort } from "../../core/domain/ports/favorite-repository.port";

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteEntity])],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    {
      provide: FavoriteRepositoryPort,
      useClass: FavoriteRepository,
    },
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}
