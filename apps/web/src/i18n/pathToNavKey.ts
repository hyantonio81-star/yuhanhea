/** Matches keys in locales/nav.ko.json & nav.es.json */
export function pathToNavKey(route: string): string {
  return route
    .replace(/^\//, '')
    .replace(/\//g, '_')
    .replace(/-/g, '_')
}
