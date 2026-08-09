const { ROLES } = require("./roles");

const ALL_ROLES = [
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.REGISTRAR,
  ROLES.ACCOUNTS,
  ROLES.FACULTY,
  ROLES.STUDENT,
];

// Data-driven permission map: module -> action -> allowed roles.
// authorize becomes a lookup against this map instead of hardcoded role checks.
const PERMISSIONS = {
  dashboard: {
    read: ALL_ROLES,
  },
  students: {
    read: ALL_ROLES,
    write: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.REGISTRAR,
      ROLES.FACULTY,
    ],
    delete: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  },
  faculty: {
    read: ALL_ROLES,
    write: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.REGISTRAR],
    delete: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  },
  departments: {
    read: ALL_ROLES,
    write: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    delete: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  },
  courses: {
    read: ALL_ROLES,
    write: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.FACULTY],
    delete: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  },
  users: {
    read: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    write: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    delete: [ROLES.SUPER_ADMIN],
  },
  audit: {
    read: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  },
};

module.exports = { PERMISSIONS, ALL_ROLES };
