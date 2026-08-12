import { useAuth } from "../context/useAuth";
import { ROLES, canAccess } from "../utils/permissions";

export function usePermissions() {
  const { user } = useAuth();
  const role = user?.role || null;

  return {
    role,
    isAdmin: role === ROLES.ADMIN,
    isManager: canAccess(role, [ROLES.ADMIN]),
    can: (allowedRoles) => canAccess(role, allowedRoles),
  };
}