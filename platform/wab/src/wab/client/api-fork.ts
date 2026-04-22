export async function fetchFeatureFlags() {
  const r = await fetch("/api/admin/feature-flags", { credentials: "include" });
  if (!r.ok) throw new Error(`flags fetch failed: ${r.status}`);
  return r.json();
}
export async function setFeatureFlag(name: string, enabled: boolean) {
  const r = await fetch("/api/admin/feature-flags", {
    method: "POST", credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name, enabled }),
  });
  if (!r.ok) throw new Error(`flag set failed: ${r.status}`);
}
