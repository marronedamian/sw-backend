import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavoriteEntity } from "../src/infrastructure/entities/favorite.entity";

beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: "sqlite",
        database: ":memory:",
        entities: [FavoriteEntity],
        synchronize: true,
      }),
    ],
  }).compile();

  (global as any).testingModule = module;
});
