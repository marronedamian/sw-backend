import { Injectable, Inject } from "@nestjs/common";
import { FavoriteRepositoryPort } from "../../domain/ports/favorite-repository.port";
import { Favorite } from "../../domain/models/favorite.model";
import { ResourceType } from "../../domain/models/star-wars.model";

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(FavoriteRepositoryPort)
    private readonly favoriteRepository: FavoriteRepositoryPort
  ) {}

  async addFavorite(
    userId: string,
    resourceType: ResourceType,
    resourceId: number
  ): Promise<Favorite> {
    const exists = await this.favoriteRepository.exists(
      userId,
      resourceType,
      resourceId
    );
    if (exists) {
      throw new Error("Favorite already exists");
    }
    return this.favoriteRepository.create({ userId, resourceType, resourceId });
  }

  async removeFavorite(id: number): Promise<void> {
    return this.favoriteRepository.delete(id);
  }

  async getUserFavorites(userId: string): Promise<Favorite[]> {
    return this.favoriteRepository.findByUser(userId);
  }
}
