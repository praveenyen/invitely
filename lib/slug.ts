export function generateSlug(title: string, hostNames: string): string {
  const base = (hostNames || title)
    .toLowerCase()
    .replace(/[&,]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base}-${suffix}`;
}
