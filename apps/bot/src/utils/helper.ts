export function hasAnyRole(memberRoles: Map<string, any>, roleIds: string[]): boolean {
  return roleIds.some((roleId) => memberRoles.has(roleId));
}
