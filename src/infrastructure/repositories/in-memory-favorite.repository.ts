import { Injectable } from "@nestjs/common";
import { FavoriteRepositoryPort } from "../../core/domain/ports/favorite-repository.port";
import { Favorite } from "../../core/domain/models/favorite.model";

@Injectable()
export class InMemoryFavoriteRepository implements FavoriteRepositoryPort {
  async exists(
    userId: string,
    resourceType: string,
    resourceId: number
  ): Promise<boolean> {
    return this.favorites.some(
      (fav) =>
        fav.userId === userId &&
        fav.resourceType === resourceType &&
        fav.resourceId === resourceId
    );
  }

  private favorites: Favorite[] = [];
  private idCounter = 1;

  async create(favorite: Favorite): Promise<Favorite> {
    const newFavorite = { ...favorite, id: this.idCounter++ };
    this.favorites.push(newFavorite);
    return newFavorite;
  }

  async delete(id: number): Promise<void> {
    this.favorites = this.favorites.filter((fav) => fav.id !== id);
  }

  async findByUser(userId: string): Promise<Favorite[]> {
    return this.favorites.filter((fav) => fav.userId === userId);
  }

  async findOne(id: number): Promise<Favorite | null> {
    return this.favorites.find((fav) => fav.id === id) || null;
  }
}
