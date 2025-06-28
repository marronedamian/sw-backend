export function extractIdFromUrl(url: string): string {
  const matches = url.match(/(\d+)\/$/);
  return matches ? matches[1] : "";
}

export function transformResource(data: any, resourceType: string): any {
  const id = extractIdFromUrl(data.url);
  return { ...data, id, resourceType };
}
