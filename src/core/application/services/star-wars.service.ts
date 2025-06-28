import { Injectable, Inject } from "@nestjs/common";
import { SWAPI_PORT, SwapiPort } from "../../domain/ports/swapi.port";
import {
  ResourceType,
  StarWarsResource,
} from "../../domain/models/star-wars.model";

@Injectable()
export class StarWarsService {
  constructor(
    @Inject(SWAPI_PORT)
    private readonly swapiAdapter: SwapiPort
  ) {}

  async getResource(
    resourceType: ResourceType,
    id: number
  ): Promise<StarWarsResource> {
    const resource = await this.swapiAdapter
      .getResource(resourceType, id)
      .toPromise();
    if (!resource) {
      throw new Error(
        `Resource of type ${resourceType} with id ${id} not found`
      );
    }
    return resource;
  }

  async getAllResources(
    resourceType: ResourceType,
    page: number
  ): Promise<StarWarsResource[]> {
    const resources = await this.swapiAdapter
      .getAllResources(resourceType, page)
      .toPromise();
    return resources ?? [];
  }

  async searchResource(
    resourceType: ResourceType,
    query: string
  ): Promise<StarWarsResource[]> {
    const resources = await this.swapiAdapter
      .searchResource(resourceType, query)
      .toPromise();
    return resources ?? [];
  }

  async compareResources(
    resourceType: ResourceType,
    ids: number[]
  ): Promise<StarWarsResource[]> {
    return Promise.all(ids.map((id) => this.getResource(resourceType, id)));
  }
}
