import { Observable } from "rxjs";
import { ResourceType, StarWarsResource } from "../models/star-wars.model";
export declare const SWAPI_PORT: unique symbol;
export interface SwapiPort {
    getResource(type: ResourceType, id: number): Observable<StarWarsResource>;
    getAllResources(type: ResourceType, page: number): Observable<StarWarsResource[]>;
    searchResource(type: ResourceType, query: string): Observable<StarWarsResource[]>;
}
