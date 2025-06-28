import { Test, TestingModule } from "@nestjs/testing";
import { FavoritesService } from "../../../src/core/application/services/favorites.service";
import {
  FavoriteRepositoryPort,
  FavoriteRepositoryPort as FAVORITE_REPOSITORY,
} from "../../../src/core/domain/ports/favorite-repository.port";
import { Favorite } from "../../../src/core/domain/models/favorite.model";

describe("FavoritesService", () => {
  let service: FavoritesService;
  let mockRepo: jest.Mocked<FavoriteRepositoryPort>;

  beforeEach(async () => {
    mockRepo = {
      create: jest.fn(),
      delete: jest.fn(),
      findByUser: jest.fn(),
      findOne: jest.fn(),
      exists: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        { provide: FAVORITE_REPOSITORY, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
  });

  it("should add favorite", async () => {
    const favorite: Favorite = {
      id: 0,
      userId: "1",
      resourceType: "people",
      resourceId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockRepo.create.mockResolvedValue({ ...favorite, id: 1 });

    const result = await service.addFavorite(
      favorite.userId,
      favorite.resourceType,
      favorite.resourceId
    );

    expect(result.id).toBe(1);
  });

  it("should get user favorites", async () => {
    const favorites: Favorite[] = [
      {
        id: 1,
        userId: "1",
        resourceType: "people",
        resourceId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    mockRepo.findByUser.mockResolvedValue(favorites);

    const result = await service.getUserFavorites("1");

    expect(result).toEqual(favorites);
  });
});
