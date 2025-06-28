import { FavoritesService } from "../../core/application/services/favorites.service";
import { Favorite } from "../../core/domain/models/favorite.model";
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    addFavorite(body: Omit<Favorite, "id" | "createdAt" | "updatedAt">): Promise<Favorite>;
    removeFavorite(id: string): Promise<void>;
    getUserFavorites(userId: string): Promise<Favorite[]>;
}
