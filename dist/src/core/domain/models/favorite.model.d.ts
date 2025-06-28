import { ResourceType } from "./star-wars.model";
export interface Favorite {
    id: number;
    userId: string;
    resourceType: ResourceType;
    resourceId: number;
    createdAt: Date;
    updatedAt: Date;
}
