// Fork-only: per-request audit log emitted to stdout + an append-only
// Postgres table (audit_events). Captures user id, route, status, and
// a stable request id so reviewers can trace any backend action.
import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";

export interface AuditEvent {
  request_id: string;
  ts: string;
  user_id: string | null;
  tenant_id: string | null;
  method: string;
  route: string;
  status: number;
  duration_ms: number;
}

export function auditMiddleware(dbMgr: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const started = Date.now();
    const rid = req.header("x-request-id") || uuid();
    (req as any).requestId = rid;
    res.on("finish", () => {
      const evt: AuditEvent = {
        request_id: rid,
        ts: new Date().toISOString(),
        user_id: (req as any).user?.id ?? null,
        tenant_id: (req as any).tenantId ?? null,
        method: req.method,
        route: req.route?.path || req.path,
        status: res.statusCode,
        duration_ms: Date.now() - started,
      };
      console.log("[audit]", JSON.stringify(evt));
      void dbMgr.recordAuditEvent?.(evt);
    });
    next();
  };
}
