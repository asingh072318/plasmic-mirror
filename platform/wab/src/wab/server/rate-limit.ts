// Fork-only: sliding-window rate limiter backed by Redis.
// Keyed on (tenantId, user_id, route_family).
import { Request, Response, NextFunction } from "express";
export interface RateLimitConfig { windowSec: number; maxHits: number; }
export function rateLimit(cfg: RateLimitConfig, redis: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = `rl:${(req as any).tenantId}:${(req as any).user?.id}:${req.route?.path || req.path}`;
    const n = await redis.incr(key);
    if (n === 1) await redis.expire(key, cfg.windowSec);
    if (n > cfg.maxHits) {
      res.setHeader("Retry-After", String(cfg.windowSec));
      return res.status(429).send("rate limit exceeded");
    }
    next();
  };
}
