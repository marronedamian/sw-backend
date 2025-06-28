import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { FavoritesModule } from "../../src/modules/favorites/favorites.module";
import { FavoritesService } from "../../src/core/application/services/favorites.service";
import { Favorite } from "../../src/core/domain/models/favorite.model";

describe("FavoritesController (e2e)", () => {
  let app: INestApplication;
  const favoritesService = {
    addFavorite: jest
      .fn()
      .mockImplementation((fav: Favorite) =>
        Promise.resolve({ ...fav, id: 1 })
      ),
    getUserFavorites: jest.fn().mockResolvedValue([]),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [FavoritesModule],
    })
      .overrideProvider(FavoritesService)
      .useValue(favoritesService)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it("/favorites (POST)", () => {
    const favorite = { userId: "1", resourceType: "people", resourceId: 1 };
    return request(app.getHttpServer())
      .post("/favorites")
      .send(favorite)
      .expect(201)
      .expect({ id: 1, ...favorite });
  });
  
  it("/favorites (GET)", () => {
    return request(app.getHttpServer())
      .get("/favorites?userId=1")
      .expect(200)
      .expect([]);
  });
  
  afterAll(async () => {
    await app.close();
  });
});
