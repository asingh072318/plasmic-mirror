// Fork-only: extract x-fork-tenant header, validate, attach to req.tenantId.
import { Request, Response, NextFunction } from "express";
import { toTenantId } from "@/wab/shared/tenancy";
export function tenantMiddleware(
  req: Request, res: Response, next: NextFunction
) {
  const raw = req.header("x-fork-tenant");
  if (!raw) return res.status(400).send("missing x-fork-tenant");
  try { (req as any).tenantId = toTenantId(raw); }
  catch (e) { return res.status(400).send(`invalid tenant: ${(e as Error).message}`); }
  next();
}
