import { Test, TestingModule } from "@nestjs/testing";
import { CacheAdapter } from "../../../src/infrastructure/adapters/cache.adapter";
import Redis from "ioredis";

jest.mock("ioredis");

describe("CacheAdapter", () => {
  let adapter: CacheAdapter;
  let redisClient: Redis;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheAdapter],
    }).compile();
    adapter = module.get<CacheAdapter>(CacheAdapter);
    redisClient = (adapter as any).redisClient;
  });

  it("should set value", async () => {
    const setSpy = jest.spyOn(redisClient, "set").mockResolvedValue("OK");
    await adapter.set("key", "value", 100);
    expect(setSpy).toHaveBeenCalledWith("key", "value", "EX", 100);
  });

  it("should get value", async () => {
    jest.spyOn(redisClient, "get").mockResolvedValue("value");
    const value = await adapter.get("key");
    expect(value).toBe("value");
  });
});
