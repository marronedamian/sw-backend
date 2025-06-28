import { SwapiPort } from "../../domain/ports/swapi.port";
import { ResourceType, StarWarsResource } from "../../domain/models/star-wars.model";
import { Observable } from "rxjs";
export declare class GetResourceUseCase {
    private readonly swapiPort;
    constructor(swapiPort: SwapiPort);
    execute(type: ResourceType, id: number): Observable<StarWarsResource>;
}
