export const ADMIN_EMAIL = "warriorking2512@gmail.com";
export const ADMIN_PASSWORD = "arshu2503";
export const ADMIN_NAME = "Admin";

export function normalizeEmail(email = "") {
  return email.trim().toLowerCase();
}

export function isAdminEmail(email) {
  return normalizeEmail(email) === ADMIN_EMAIL;
}
