import { Test, TestingModule } from "@nestjs/testing";
import { GetResourceUseCase } from "../../../src/core/application/use-cases/get-resource.usecase";
import {
  SWAPI_PORT,
  SwapiPort,
} from "../../../src/core/domain/ports/swapi.port";
import { ResourceType } from "../../../src/core/domain/models/star-wars.model";
import { of } from "rxjs";

describe("GetResourceUseCase", () => {
  let useCase: GetResourceUseCase;
  let mockSwapiPort: jest.Mocked<SwapiPort>;

  beforeEach(async () => {
    mockSwapiPort = {
      getResource: jest.fn(),
      getAllResources: jest.fn(),
      searchResource: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetResourceUseCase,
        {
          provide: SWAPI_PORT,
          useValue: mockSwapiPort,
        },
      ],
    }).compile();

    useCase = module.get<GetResourceUseCase>(GetResourceUseCase);
  });

  it("should get resource", (done) => {
    const mockData = {
      id: "1",
      name: "Tatooine",
      url: "https://swapi.dev/api/planets/1/",
      created: "2024-01-01T00:00:00.000Z",
      edited: "2024-01-01T00:00:00.000Z",
    };

    mockSwapiPort.getResource.mockReturnValueOnce(of(mockData));

    useCase.execute("planets" as ResourceType, 1).subscribe({
      next: (data) => {
        expect(data).toEqual(mockData);
        done();
      },
    });
  });
});
