import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Param,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
} from "@nestjs/swagger";
import { FavoritesService } from "../../core/application/services/favorites.service";
import { Favorite } from "../../core/domain/models/favorite.model";

@ApiTags("favorites")
@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({ summary: "Agregar un recurso a favoritos" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["userId", "resourceType", "resourceId"],
      properties: {
        userId: { type: "string", example: "abc123" },
        resourceType: {
          type: "string",
          enum: ["people", "films", "starships", "planets"],
        },
        resourceId: { type: "number", example: 5 },
      },
    },
  })
  async addFavorite(
    @Body() body: Omit<Favorite, "id" | "createdAt" | "updatedAt">
  ) {
    return this.favoritesService.addFavorite(
      body.userId,
      body.resourceType,
      body.resourceId
    );
  }

  @Delete(":id")
  @ApiOperation({ summary: "Eliminar un favorito por ID" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "ID del favorito",
  })
  async removeFavorite(@Param("id") id: string) {
    return this.favoritesService.removeFavorite(Number(id));
  }

  @Get()
  @ApiOperation({ summary: "Listar favoritos de un usuario" })
  @ApiQuery({
    name: "userId",
    required: true,
    example: "abc123",
    description: "ID del usuario",
  })
  async getUserFavorites(@Query("userId") userId: string) {
    return this.favoritesService.getUserFavorites(userId);
  }
}
