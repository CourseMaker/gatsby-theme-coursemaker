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

export function deleteSessionStorage(name) {
  if (typeof window !== "undefined") {
    return sessionStorage.removeItem(format(name));
  }
}

export function bakeSessionStorage(name, value) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(
      format(name),
      isValidStringify ? JSON.stringify(value) : value
    );
  }
}

export function readSessionStorage(name) {
  if (typeof window !== "undefined") {
    let value = sessionStorage.getItem(format(name));
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

export function bakeCookie(name, value, date) {
  if (typeof window !== "undefined") {
    // const isLocal = process.env.NODE_ENV !== "production";
    const expiry = date instanceof Date ? `expires=${date};` : "";

    document.cookie = `${format(name)}=${JSON.stringify(
      value
    )};${expiry}path=/`;
  }
}

export function readCookie(name) {
  if (typeof window !== "undefined") {
    let value = "; " + document.cookie;
    const parts = value.split("; " + format(name) + "=");
    value =
      parts.length === 2
        ? parts
            .pop()
            .split(";")
            .shift()
        : undefined;

    return value ? (isValidJSON(value) ? JSON.parse(value) : value) : undefined;
  }

  return null;
}

export function deleteCookie(name) {
  if (typeof window !== "undefined") {
    document.cookie = `${format(
      name
    )}=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/`;
  }
}
