/**
 * Prototype access control — soft gate for the interactive prompt-x prototype.
 * Change PROTOTYPE_PASSWORD to update the access password.
 */

const PROTOTYPE_PASSWORD = "atomic-promptx";
const STORAGE_KEY = "promptx-prototype-auth";

export function isPrototypeAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function authenticatePrototype(password: string): boolean {
  if (password === PROTOTYPE_PASSWORD) {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // sessionStorage unavailable
    }
    return true;
  }
  return false;
}

export const CONTACT_EMAIL = "hola@atomic-products.com";
export const ACCESS_MESSAGE = `This is a protected prototype. Contact ${CONTACT_EMAIL} to request access.`;
