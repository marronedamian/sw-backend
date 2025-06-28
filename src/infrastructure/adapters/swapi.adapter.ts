import * as https from "https";
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { catchError, map, Observable, of } from "rxjs";
import { SwapiPort } from "../../core/domain/ports/swapi.port";
import {
  ResourceType,
  StarWarsResource,
} from "../../core/domain/models/star-wars.model";

@Injectable()
export class SwapiAdapter implements SwapiPort {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  private getBaseUrl(): string {
    const baseUrl = this.configService.get<string>("SWAPI_BASE_URL");
    if (!baseUrl) {
      throw new Error("SWAPI baseUrl is not defined in configuration");
    }
    return baseUrl;
  }

  private getHttpsAgent() {
    const isDev = this.configService.get<string>("NODE_ENV") !== "production";
    return isDev ? new https.Agent({ rejectUnauthorized: true }) : undefined;
  }

  getResource(
    resourceType: ResourceType,
    id: number
  ): Observable<StarWarsResource> {
    const url = `${this.getBaseUrl()}/${resourceType}/${id}/`;
    return this.httpService
      .get(url, {
        httpsAgent: this.getHttpsAgent(),
      })
      .pipe(
        map((res) => this.transformResource(res.data, resourceType)),
        catchError((err) => {
          console.error("Error in getResource:", err.message);
          throw err;
        })
      );
  }

  getAllResources(
    resourceType: ResourceType,
    page: number
  ): Observable<StarWarsResource[]> {
    const url = `${this.getBaseUrl()}/${resourceType}/?page=${page}`;
    return this.httpService
      .get(url, {
        httpsAgent: this.getHttpsAgent(),
      })
      .pipe(
        map((res) => {
          const data = res.data;
          const results = Array.isArray(data)
            ? data
            : Array.isArray(data?.results)
              ? data.results
              : [];

          return results.map((item: any) =>
            this.transformResource(item, resourceType)
          );
        }),
        catchError((err) => {
          console.error("Error in getAllResources:", err.message);
          return of([]);
        })
      );
  }

  searchResource(
    resourceType: ResourceType,
    query: string
  ): Observable<StarWarsResource[]> {
    const url = `${this.getBaseUrl()}/${resourceType}/?search=${query}`;
    return this.httpService
      .get(url, {
        httpsAgent: this.getHttpsAgent(),
      })
      .pipe(
        map((res) => {
          const results = res.data?.results;
          if (!Array.isArray(results)) return [];
          return results.map((item: any) =>
            this.transformResource(item, resourceType)
          );
        }),
        catchError((err) => {
          console.error("Error in searchResource:", err.message);
          return of([]);
        })
      );
  }

  private transformResource(
    data: any,
    resourceType: ResourceType
  ): StarWarsResource {
    const id = this.extractIdFromUrl(data.url);
    return { ...data, id, resourceType };
  }

  private extractIdFromUrl(url: string): string {
    const segments = url.split("/").filter(Boolean);
    return segments.at(-1) || "";
  }
}
