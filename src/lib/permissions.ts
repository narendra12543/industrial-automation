export function canAccessAdmin(
  role?: string
) {
  return role === "ADMIN";
}

export function canAccessUser(
  role?: string
) {
  return role === "USER" || role === "ADMIN";
}