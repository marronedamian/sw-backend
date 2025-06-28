import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FavoriteEntity } from "../entities/favorite.entity";
import { FavoriteRepositoryPort } from "../../core/domain/ports/favorite-repository.port";
import { Favorite } from "../../core/domain/models/favorite.model";

@Injectable()
export class FavoriteRepository implements FavoriteRepositoryPort {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly ormRepository: Repository<FavoriteEntity>
  ) {}

  async create(
    favorite: Omit<Favorite, "id" | "createdAt" | "updatedAt">
  ): Promise<Favorite> {
    const newFavorite = this.ormRepository.create(favorite);
    await this.ormRepository.save(newFavorite);
    return this.toDomain(newFavorite);
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findByUser(userId: string): Promise<Favorite[]> {
    const favorites = await this.ormRepository.find({ where: { userId } });
    return favorites.map(this.toDomain);
  }

  async findOne(id: number): Promise<Favorite | null> {
    const favorite = await this.ormRepository.findOne({ where: { id } });
    return favorite ? this.toDomain(favorite) : null;
  }

  async exists(
    userId: string,
    resourceType: string,
    resourceId: number
  ): Promise<boolean> {
    const count = await this.ormRepository.count({
      where: { userId, resourceType, resourceId },
    });
    return count > 0;
  }

  private toDomain(entity: FavoriteEntity): Favorite {
    return {
      id: entity.id,
      userId: entity.userId,
      resourceType: entity.resourceType as any,
      resourceId: entity.resourceId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
