import { SwapiPort } from "../../domain/ports/swapi.port";
import { ResourceType, StarWarsResource } from "../../domain/models/star-wars.model";
export declare class CompareResourcesUseCase {
    private readonly swapiPort;
    constructor(swapiPort: SwapiPort);
    execute(type: ResourceType, ids: number[]): Promise<StarWarsResource[]>;
}
