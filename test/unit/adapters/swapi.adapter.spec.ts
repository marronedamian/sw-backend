import { Test, TestingModule } from "@nestjs/testing";
import { SwapiAdapter } from "../../../src/infrastructure/adapters/swapi.adapter";
import { HttpService } from "@nestjs/axios";
import { of } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { ResourceType } from "../../../src/core/domain/models/star-wars.model";

describe("SwapiAdapter", () => {
  let adapter: SwapiAdapter;
  let httpService: HttpService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SwapiAdapter,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() =>
              of({
                data: {
                  name: "Tatooine",
                  url: "https://swapi.dev/api/planets/1/",
                },
              }),
            ),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue("https://swapi.dev/api"),
          },
        },
      ],
    }).compile();

    adapter = module.get<SwapiAdapter>(SwapiAdapter);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it("should get resource", (done) => {
    adapter.getResource("planets" as ResourceType, 1).subscribe({
      next: (data) => {
        expect(data).toHaveProperty("id", "1");
        expect(data).toHaveProperty("name", "Tatooine");
        done();
      },
      error: (err) => done(err),
    });
  });
});
