import { Module } from "@nestjs/common";
import { HttpModule, HttpService } from "@nestjs/axios";
import { StarWarsController } from "../../infrastructure/controllers/star-wars.controller";
import { StarWarsService } from "../../core/application/services/star-wars.service";
import { SwapiAdapter } from "../../infrastructure/adapters/swapi.adapter";
import { SWAPI_PORT } from "../../core/domain/ports/swapi.port";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import redisStore from "cache-manager-redis-store";

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore as any,
        host: configService.get("cache.redis.host"),
        port: configService.get("cache.redis.port"),
        ttl: configService.get("cache.ttl"),
      }),
    }),
  ],
  controllers: [StarWarsController],
  providers: [
    StarWarsService,
    {
      provide: SWAPI_PORT,
      useFactory: (httpService: HttpService, configService: ConfigService) =>
        new SwapiAdapter(httpService, configService),
      inject: [HttpService, ConfigService],
    },
  ],
  exports: [StarWarsService],
})
export class StarWarsModule {}
