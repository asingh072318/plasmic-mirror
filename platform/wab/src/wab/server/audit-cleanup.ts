// Fork-only: nightly job that prunes audit_events older than 90 days.
import { Connection } from "typeorm";
export async function pruneAuditEvents(conn: Connection, retentionDays = 90) {
  const cutoff = new Date(Date.now() - retentionDays * 86400 * 1000);
  const result = await conn.query(
    "DELETE FROM audit_events WHERE ts < $1", [cutoff]
  );
  return result?.[1] ?? 0;
}
