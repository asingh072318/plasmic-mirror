// Fork-only: tenancy primitives. Every user belongs to exactly one tenant.
export type TenantId = string & { __tenant: true };
export function toTenantId(raw: string): TenantId {
  if (!raw.match(/^[a-z0-9-]{1,64}$/))
    throw new Error(`invalid tenant id: ${raw}`);
  return raw as TenantId;
}
export const SYSTEM_TENANT = toTenantId("system");
