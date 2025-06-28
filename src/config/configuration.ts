import { registerAs } from "@nestjs/config";

export default registerAs("config", () => ({
  port: parseInt(process.env.PORT || "", 10) || 3021,
  swapi: {
    baseUrl: process.env.SWAPI_BASE_URL,
  },
  database: {
    type: "sqlite",
    database: process.env.DATABASE_PATH || "./db.sqlite",
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    synchronize: true,
  },
  cache: {
    ttl: parseInt(process.env.CACHE_TTL || "", 10) || 3600,
    redis: {
      host: process.env.REDIS_HOST || "localhost",
      port: parseInt(process.env.REDIS_PORT || "", 10) || 6379,
    },
  },
}));
