export const ROLES = Object.freeze({
  ADMIN: "Admin",
  FACULTY: "Faculty",
  STUDENT: "Student",
});

export const MANAGEMENT_ROLES = Object.freeze([ROLES.ADMIN]);

export const ROLE_LABELS = Object.freeze({
  [ROLES.ADMIN]: "Administrator",
  [ROLES.FACULTY]: "Faculty",
  [ROLES.STUDENT]: "Student",
});

export function canAccess(role, allowedRoles) {
  if (!allowedRoles || allowedRoles.length === 0) return true;
  return allowedRoles.includes(role);
}

export function getRoleLabel(role) {
  return ROLE_LABELS[role] || role || "Member";
}