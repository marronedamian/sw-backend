import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavoriteEntity } from "./infrastructure/entities/favorite.entity";
import { StarWarsModule } from "./modules/star-wars/star-wars.module";
import { FavoritesModule } from "./modules/favorites/favorites.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "sqlite",
        database: configService.get("DATABASE_URL") || "./db.sqlite",
        entities: [FavoriteEntity],
        synchronize: true,
      }),
    }),
    StarWarsModule,
    FavoritesModule,
  ],
})
export class AppModule {}
