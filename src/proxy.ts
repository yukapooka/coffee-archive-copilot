import type { NextRequest } from "next/server";
import { checkBasicAuth } from "@/lib/basic-auth";

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

export function proxy(request: NextRequest) {
  const result = checkBasicAuth(request.headers.get("authorization"));

  if (result === "authorized") return;
  if (result === "not-configured") return serverConfigError();

  return unauthorized();
}

export const config = {
  // Exclude only Next.js build assets and the favicon. Excluding by file
  // extension would also skip auth for app routes (and their Server Actions)
  // whose URL happens to end in .png, .js, etc.
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico$).*)"],
};
