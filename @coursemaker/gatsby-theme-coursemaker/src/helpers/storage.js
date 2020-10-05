import { isValidJSON, isValidStringify } from "./index";

// prefixes value onto storage keys to ensure third parties don't override our storage
const format = (name) => {
  const prefix = ``;

  if (process.env.NODE_ENV === "development") {
    return `${prefix}_local_${name}`;
  }

  return `${prefix}_${name}`;
};

// Cookies and localStorage
export function bakeLocalStorage(name, value) {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      format(name),
      isValidStringify ? JSON.stringify(value) : value
    );
  }
}

export function readLocalStorage(name) {
  if (typeof window !== "undefined") {
    let value = localStorage.getItem(format(name));
    return typeof value === "string" && isValidJSON(value)
      ? JSON.parse(value)
      : value;
  }

  return null;
}

export function deleteLocalStorage(name) {
  if (typeof window !== "undefined") {
    return localStorage.removeItem(format(name));
  }
}
