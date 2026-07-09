export function decodeEmbedUrl(url: string) {
  const data = new URL(url).searchParams.get("data");

  if (!data) return null;

  const json = atob(data);
  const decoded = decodeURIComponent(json);

  return JSON.parse(decoded);
}
