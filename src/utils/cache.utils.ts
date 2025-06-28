export function generateCacheKey(
  resourceType: string,
  id?: number | string,
  search?: string
): string {
  if (id) {
    return `swapi:${resourceType}:${id}`;
  }
  if (search) {
    return `swapi:${resourceType}:search:${search}`;
  }
  return `swapi:${resourceType}:list`;
}
