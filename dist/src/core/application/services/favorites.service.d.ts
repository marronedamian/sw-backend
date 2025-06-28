import { FavoriteRepositoryPort } from "../../domain/ports/favorite-repository.port";
import { Favorite } from "../../domain/models/favorite.model";
import { ResourceType } from "../../domain/models/star-wars.model";
export declare class FavoritesService {
    private readonly favoriteRepository;
    constructor(favoriteRepository: FavoriteRepositoryPort);
    addFavorite(userId: string, resourceType: ResourceType, resourceId: number): Promise<Favorite>;
    removeFavorite(id: number): Promise<void>;
    getUserFavorites(userId: string): Promise<Favorite[]>;
}
