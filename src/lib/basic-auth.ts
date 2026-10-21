import { headers } from "next/headers";

export type BasicAuthResult = "authorized" | "unauthorized" | "not-configured";

function getBasicAuthCredentials(header: string | null) {
  if (!header?.startsWith("Basic ")) return null;

  try {
    const decoded = atob(header.slice("Basic ".length));
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) return null;

    return {
      user: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
}

export function checkBasicAuth(authorizationHeader: string | null): BasicAuthResult {
  const configuredUser = process.env.BASIC_AUTH_USER;
  const configuredPassword = process.env.BASIC_AUTH_PASSWORD;

  if (!configuredUser || !configuredPassword) {
    return process.env.NODE_ENV !== "production" ? "authorized" : "not-configured";
  }

  const credentials = getBasicAuthCredentials(authorizationHeader);

  if (
    credentials?.user === configuredUser &&
    credentials.password === configuredPassword
  ) {
    return "authorized";
  }

  return "unauthorized";
}

// Server Actions are separate entry points, so each one re-checks the
// credentials instead of relying on the proxy matcher alone.
export async function requireBasicAuth() {
  const result = checkBasicAuth((await headers()).get("authorization"));

  if (result !== "authorized") {
    throw new Error("Unauthorized");
  }
}
