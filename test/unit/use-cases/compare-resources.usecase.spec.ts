import { Test, TestingModule } from "@nestjs/testing";
import { CompareResourcesUseCase } from "../../../src/core/application/use-cases/compare-resources.usecase";
import {
  SWAPI_PORT,
  SwapiPort,
} from "../../../src/core/domain/ports/swapi.port";
import { of } from "rxjs";
import { ResourceType } from "../../../src/core/domain/models/star-wars.model";

describe("CompareResourcesUseCase", () => {
  let useCase: CompareResourcesUseCase;
  let mockSwapiPort: jest.Mocked<SwapiPort>;

  beforeEach(async () => {
    mockSwapiPort = {
      getResource: jest.fn(),
      getAllResources: jest.fn(),
      searchResource: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompareResourcesUseCase,
        {
          provide: SWAPI_PORT,
          useValue: mockSwapiPort,
        },
      ],
    }).compile();

    useCase = module.get<CompareResourcesUseCase>(CompareResourcesUseCase);
  });

  it("should compare two resources", async () => {
    const mockResources = [
      {
        id: "1",
        name: "Film 1",
        url: "https://swapi.dev/api/films/1/",
        created: "2024-01-01T00:00:00.000Z",
        edited: "2024-01-01T00:00:00.000Z",
      },
      {
        id: "2",
        name: "Film 2",
        url: "https://swapi.dev/api/films/2/",
        created: "2024-01-01T00:00:00.000Z",
        edited: "2024-01-01T00:00:00.000Z",
      },
    ];

    mockSwapiPort.getResource
      .mockReturnValueOnce(of(mockResources[0]))
      .mockReturnValueOnce(of(mockResources[1]));

    const result = await useCase.execute("films" as ResourceType, [1, 2]);
    expect(result).toEqual(mockResources);
  });
});
