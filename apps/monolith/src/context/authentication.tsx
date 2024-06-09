import { cache, createAsync } from "@solidjs/router";

import { createSafeContext } from "~/lib/primitives/context";

import { rpcErrorResponse, rpcSuccessResponse } from "~/lib/utils/rpc";

const routeData = cache(async () => {
  "use server";

  // TODO: Replace with AuthService
  const authenticatedActor = null;

  if (authenticatedActor) {
    return rpcSuccessResponse(authenticatedActor);
  }

  return rpcErrorResponse({ message: "Not authenticated" });
}, "authentication:session");

export const [AuthenticationProvider, useAuthentication] = createSafeContext(
  () => {
    const authenticatedActor = createAsync(() => routeData());

    return { actor: () => authenticatedActor()?.data || null };
  },
  { actor: () => null },
);

export const useAuth = useAuthentication;
