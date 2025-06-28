import { SwapiPort } from "../../domain/ports/swapi.port";
import { ResourceType, StarWarsResource } from "../../domain/models/star-wars.model";
export declare class StarWarsService {
    private readonly swapiAdapter;
    constructor(swapiAdapter: SwapiPort);
    getResource(resourceType: ResourceType, id: number): Promise<StarWarsResource>;
    getAllResources(resourceType: ResourceType, page: number): Promise<StarWarsResource[]>;
    searchResource(resourceType: ResourceType, query: string): Promise<StarWarsResource[]>;
    compareResources(resourceType: ResourceType, ids: number[]): Promise<StarWarsResource[]>;
}
