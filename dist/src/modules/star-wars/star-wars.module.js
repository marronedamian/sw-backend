"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarWarsModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const star_wars_controller_1 = require("../../infrastructure/controllers/star-wars.controller");
const star_wars_service_1 = require("../../core/application/services/star-wars.service");
const swapi_adapter_1 = require("../../infrastructure/adapters/swapi.adapter");
const swapi_port_1 = require("../../core/domain/ports/swapi.port");
const config_1 = require("@nestjs/config");
const cache_manager_1 = require("@nestjs/cache-manager");
const cache_manager_redis_store_1 = __importDefault(require("cache-manager-redis-store"));
let StarWarsModule = class StarWarsModule {
};
exports.StarWarsModule = StarWarsModule;
exports.StarWarsModule = StarWarsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            config_1.ConfigModule,
            cache_manager_1.CacheModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    store: cache_manager_redis_store_1.default,
                    host: configService.get("cache.redis.host"),
                    port: configService.get("cache.redis.port"),
                    ttl: configService.get("cache.ttl"),
                }),
            }),
        ],
        controllers: [star_wars_controller_1.StarWarsController],
        providers: [
            star_wars_service_1.StarWarsService,
            {
                provide: swapi_port_1.SWAPI_PORT,
                useFactory: (httpService, configService) => new swapi_adapter_1.SwapiAdapter(httpService, configService),
                inject: [axios_1.HttpService, config_1.ConfigService],
            },
        ],
        exports: [star_wars_service_1.StarWarsService],
    })
], StarWarsModule);
//# sourceMappingURL=star-wars.module.js.map