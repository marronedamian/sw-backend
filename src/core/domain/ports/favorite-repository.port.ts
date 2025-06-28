import { Favorite } from "../models/favorite.model";

export const FavoriteRepositoryPort = Symbol("FavoriteRepositoryPort");

export interface FavoriteRepositoryPort {
  create(
    favorite: Omit<Favorite, "id" | "createdAt" | "updatedAt">
  ): Promise<Favorite>;
  
  delete(id: number): Promise<void>;

  findByUser(userId: string): Promise<Favorite[]>;

  findOne(id: number): Promise<Favorite | null>;

  exists(
    userId: string,
    resourceType: string,
    resourceId: number
  ): Promise<boolean>;
}
