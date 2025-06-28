import { FavoriteRepositoryPort } from "../../core/domain/ports/favorite-repository.port";
import { Favorite } from "../../core/domain/models/favorite.model";
export declare class InMemoryFavoriteRepository implements FavoriteRepositoryPort {
    exists(userId: string, resourceType: string, resourceId: number): Promise<boolean>;
    private favorites;
    private idCounter;
    create(favorite: Favorite): Promise<Favorite>;
    delete(id: number): Promise<void>;
    findByUser(userId: string): Promise<Favorite[]>;
    findOne(id: number): Promise<Favorite | null>;
}
