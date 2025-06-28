import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { StarWarsModule } from "../../src/modules/star-wars/star-wars.module";
import { StarWarsService } from "../../src/core/application/services/star-wars.service";

describe("StarWarsController (e2e)", () => {
  let app: INestApplication;
  const starWarsService = {
    getResource: jest.fn().mockResolvedValue({ name: "Luke Skywalker" }),
    compareResources: jest
      .fn()
      .mockResolvedValue([{ name: "Luke" }, { name: "Vader" }]),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [StarWarsModule],
    })
      .overrideProvider(StarWarsService)
      .useValue(starWarsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it("/star-wars/people/1 (GET)", () => {
    return request(app.getHttpServer())
      .get("/star-wars/people/1")
      .expect(200)
      .expect({ name: "Luke Skywalker" });
  });

  it("/star-wars/people/compare?ids=1,2 (GET)", () => {
    return request(app.getHttpServer())
      .get("/star-wars/people/compare?ids=1,2")
      .expect(200)
      .expect([{ name: "Luke" }, { name: "Vader" }]);
  });

  afterAll(async () => {
    await app.close();
  });
});
