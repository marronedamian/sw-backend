import { Inject, Injectable } from "@nestjs/common";
import { SwapiPort, SWAPI_PORT } from "../../domain/ports/swapi.port";
import {
  ResourceType,
  StarWarsResource,
} from "../../domain/models/star-wars.model";
import { lastValueFrom } from "rxjs";

@Injectable()
export class CompareResourcesUseCase {
  constructor(
    @Inject(SWAPI_PORT)
    private readonly swapiPort: SwapiPort
  ) {}

  async execute(
    type: ResourceType,
    ids: number[]
  ): Promise<StarWarsResource[]> {
    return Promise.all(
      ids.map((id) => lastValueFrom(this.swapiPort.getResource(type, id)))
    );
  }
}
