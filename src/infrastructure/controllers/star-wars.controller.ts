import {
  Controller,
  Get,
  Param,
  Query,
  BadRequestException,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from "@nestjs/swagger";
import { StarWarsService } from "../../core/application/services/star-wars.service";
import { ResourceType } from "../../core/domain/models/star-wars.model";

@ApiTags("star-wars")
@Controller("star-wars")
export class StarWarsController {
  constructor(private readonly starWarsService: StarWarsService) {}

  @Get(":resourceType/compare")
  @ApiOperation({ summary: "Comparar recursos por IDs" })
  @ApiParam({
    name: "resourceType",
    enum: ["people", "films", "starships", "planets"],
    description: "Tipo de recurso a comparar",
  })
  @ApiQuery({
    name: "ids",
    required: true,
    example: "2,5",
    description: "IDs separados por coma para comparar recursos",
  })
  compareResources(
    @Param("resourceType") resourceType: ResourceType,
    @Query("ids") ids: string
  ) {
    if (!ids) {
      throw new BadRequestException('Parámetro "ids" es requerido.');
    }

    const parsedIds = ids
      .split(",")
      .map((id) => parseInt(id.trim(), 10))
      .filter((id) => !isNaN(id));

    if (parsedIds.length === 0) {
      throw new BadRequestException("Debe proporcionar al menos un ID válido.");
    }

    return this.starWarsService.compareResources(resourceType, parsedIds);
  }

  @Get(":resourceType")
  @ApiOperation({ summary: "Listar recursos o buscar por nombre" })
  @ApiParam({
    name: "resourceType",
    enum: ["people", "films", "starships", "planets"],
    description: "Tipo de recurso",
  })
  @ApiQuery({
    name: "page",
    required: false,
    example: 1,
    description: "Número de página para paginación",
  })
  @ApiQuery({
    name: "search",
    required: false,
    example: "Luke",
    description: "Término de búsqueda",
  })
  async getAll(
    @Param("resourceType") resourceType: ResourceType,
    @Query("page") page: number = 1,
    @Query("search") search: string
  ) {
    if (search) {
      return this.starWarsService.searchResource(resourceType, search);
    }
    return this.starWarsService.getAllResources(resourceType, page);
  }

  @Get(":resourceType/:id")
  @ApiOperation({ summary: "Obtener un recurso por ID" })
  @ApiParam({
    name: "resourceType",
    enum: ["people", "films", "starships", "planets"],
    description: "Tipo de recurso",
  })
  @ApiParam({
    name: "id",
    type: Number,
    description: "ID del recurso",
  })
  async getOne(
    @Param("resourceType") resourceType: ResourceType,
    @Param("id") id: number
  ) {
    return this.starWarsService.getResource(resourceType, id);
  }
}
