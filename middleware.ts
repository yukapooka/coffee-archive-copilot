import type { NextRequest } from "next/server";

function unauthorized() {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Coffee Archive"',
    },
  });
}

function serverConfigError() {
  return new Response("Basic Auth is not configured", {
    status: 500,
  });
}

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

export function middleware(request: NextRequest) {
  const configuredUser = process.env.BASIC_AUTH_USER;
  const configuredPassword = process.env.BASIC_AUTH_PASSWORD;

  if (!configuredUser || !configuredPassword) {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    return serverConfigError();
  }

  const credentials = getBasicAuthCredentials(
    request.headers.get("authorization")
  );

  if (
    credentials?.user === configuredUser &&
    credentials.password === configuredPassword
  ) {
    return;
  }

  return unauthorized();
}

export const config = {
  matcher: [
    "/((?!_next|favicon\\.ico|.*\\.(?:png|jpg|jpeg|svg|ico|css|js)$).*)",
  ],
};
