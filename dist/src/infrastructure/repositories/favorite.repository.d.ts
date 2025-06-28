import { Repository } from "typeorm";
import { FavoriteEntity } from "../entities/favorite.entity";
import { FavoriteRepositoryPort } from "../../core/domain/ports/favorite-repository.port";
import { Favorite } from "../../core/domain/models/favorite.model";
export declare class FavoriteRepository implements FavoriteRepositoryPort {
    private readonly ormRepository;
    constructor(ormRepository: Repository<FavoriteEntity>);
    create(favorite: Omit<Favorite, "id" | "createdAt" | "updatedAt">): Promise<Favorite>;
    delete(id: number): Promise<void>;
    findByUser(userId: string): Promise<Favorite[]>;
    findOne(id: number): Promise<Favorite | null>;
    exists(userId: string, resourceType: string, resourceId: number): Promise<boolean>;
    private toDomain;
}
