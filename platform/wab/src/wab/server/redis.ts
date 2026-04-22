// Fork-only: shared Redis client for rate-limit + session storage.
import Redis from "ioredis";
export const redisClient = new Redis(
  process.env.REDIS_URL || "redis://127.0.0.1:6379",
  { lazyConnect: true, maxRetriesPerRequest: 2 }
);
redisClient.on("error", (e) => console.error("[fork-redis]", e.message));
