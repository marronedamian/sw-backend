import { Inject, Injectable } from "@nestjs/common";
import { SwapiPort, SWAPI_PORT } from "../../domain/ports/swapi.port";
import {
  ResourceType,
  StarWarsResource,
} from "../../domain/models/star-wars.model";
import { Observable } from "rxjs";

@Injectable()
export class GetResourceUseCase {
  constructor(
    @Inject(SWAPI_PORT)
    private readonly swapiPort: SwapiPort
  ) {}

  execute(type: ResourceType, id: number): Observable<StarWarsResource> {
    return this.swapiPort.getResource(type, id);
  }
}
