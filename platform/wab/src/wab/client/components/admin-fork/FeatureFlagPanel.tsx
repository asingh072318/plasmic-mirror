import * as React from "react";
interface Flag { name: string; enabled: boolean; }
export function FeatureFlagPanel() {
  const [flags, setFlags] = React.useState<Flag[]>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    void fetch("/api/admin/feature-flags")
      .then((r) => r.json())
      .then((d) => { setFlags(d.flags); setLoading(false); });
  }, []);
  const toggle = async (f: Flag) => {
    await fetch("/api/admin/feature-flags", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: f.name, enabled: !f.enabled }),
    });
    setFlags(flags.map((x) => x.name === f.name ? { ...x, enabled: !x.enabled } : x));
  };
  if (loading) return <div>Loading flags…</div>;
  return <ul>{flags.map((f) => (
    <li key={f.name}>
      <label><input type="checkbox" checked={f.enabled} onChange={() => toggle(f)} /> {f.name}</label>
    </li>))}</ul>;
}
