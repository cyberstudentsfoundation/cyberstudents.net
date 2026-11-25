/**
 * Challenge authors as the community knows them. The database stores each author's sign-in account name, which is not
 * always the handle we credit (thee2d is GodderE2D, for example), so every page that shows an author from the database
 * goes through `authorHandle`. Names not listed here are shown as they are.
 */
const HANDLES: Record<string, string> = {
  thee2d: "GodderE2D",
  qvipin: "Vipin",
  a_person9852: "a_person",
  kolmus: "Kolmus",
  ladderlogic: "Logix",
  _avyra: "vy",
  "7000x887143": "wjaaaaaaat",
};

export function authorHandle(accountName: string | null): string | null {
  if (!accountName) return accountName;
  return HANDLES[accountName] ?? accountName;
}
