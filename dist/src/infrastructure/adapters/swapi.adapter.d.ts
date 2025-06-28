import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";
import { SwapiPort } from "../../core/domain/ports/swapi.port";
import { ResourceType, StarWarsResource } from "../../core/domain/models/star-wars.model";
export declare class SwapiAdapter implements SwapiPort {
    private readonly httpService;
    private readonly configService;
    constructor(httpService: HttpService, configService: ConfigService);
    private getBaseUrl;
    private getHttpsAgent;
    getResource(resourceType: ResourceType, id: number): Observable<StarWarsResource>;
    getAllResources(resourceType: ResourceType, page: number): Observable<StarWarsResource[]>;
    searchResource(resourceType: ResourceType, query: string): Observable<StarWarsResource[]>;
    private transformResource;
    private extractIdFromUrl;
}
