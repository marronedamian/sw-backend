import { Observable } from "rxjs";
import { ResourceType, StarWarsResource } from "../models/star-wars.model";

export const SWAPI_PORT = Symbol("SWAPI_PORT");

export interface SwapiPort {
  getResource(type: ResourceType, id: number): Observable<StarWarsResource>;
  
  getAllResources(
    type: ResourceType,
    page: number
  ): Observable<StarWarsResource[]>;

  searchResource(
    type: ResourceType,
    query: string
  ): Observable<StarWarsResource[]>;
}
