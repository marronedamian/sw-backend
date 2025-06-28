import { StarWarsService } from "../../core/application/services/star-wars.service";
import { ResourceType } from "../../core/domain/models/star-wars.model";
export declare class StarWarsController {
    private readonly starWarsService;
    constructor(starWarsService: StarWarsService);
    compareResources(resourceType: ResourceType, ids: string): Promise<import("../../core/domain/models/star-wars.model").StarWarsResource[]>;
    getAll(resourceType: ResourceType, page: number | undefined, search: string): Promise<import("../../core/domain/models/star-wars.model").StarWarsResource[]>;
    getOne(resourceType: ResourceType, id: number): Promise<import("../../core/domain/models/star-wars.model").StarWarsResource>;
}
