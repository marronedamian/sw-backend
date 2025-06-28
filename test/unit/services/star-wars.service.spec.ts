import { Test, TestingModule } from "@nestjs/testing";
import { StarWarsService } from "../../../src/core/application/services/star-wars.service";
import {
  SWAPI_PORT,
  SwapiPort,
} from "../../../src/core/domain/ports/swapi.port";
import { of } from "rxjs";
import { ResourceType } from "../../../src/core/domain/models/star-wars.model";

describe("StarWarsService", () => {
  let service: StarWarsService;
  let mockSwapiAdapter: jest.Mocked<SwapiPort>;

  beforeEach(async () => {
    mockSwapiAdapter = {
      getResource: jest.fn(),
      getAllResources: jest.fn(),
      searchResource: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarWarsService,
        { provide: SWAPI_PORT, useValue: mockSwapiAdapter },
      ],
    }).compile();

    service = module.get<StarWarsService>(StarWarsService);
  });

  it("should compare resources by id", async () => {
    const mockData = [
      {
        id: "1",
        name: "Luke",
        url: "https://swapi.dev/api/people/1/",
        created: "2024-01-01T00:00:00.000Z",
        edited: "2024-01-01T00:00:00.000Z",
      },
      {
        id: "2",
        name: "Vader",
        url: "https://swapi.dev/api/people/2/",
        created: "2024-01-01T00:00:00.000Z",
        edited: "2024-01-01T00:00:00.000Z",
      },
    ];

    mockSwapiAdapter.getResource
      .mockReturnValueOnce(of(mockData[0]))
      .mockReturnValueOnce(of(mockData[1]));

    const result = await service.compareResources(
      "people" as ResourceType,
      [1, 2]
    );

    expect(result).toEqual(mockData);
  });
});
