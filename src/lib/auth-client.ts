import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { jwtClient } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",

  plugins: [
    inferAdditionalFields<typeof auth>(),
    jwtClient(),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;