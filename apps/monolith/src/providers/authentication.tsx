import { createContextProvider } from "@solid-primitives/context";
import { cache, createAsync } from "@solidjs/router";

import * as AuthenticationService from "~/lib/api/authentication/authentication.service";

import { rpcErrorResponse, rpcSuccessResponse } from "~/lib/utils/rpc";

const routeData = cache(async () => {
  "use server";

  const authenticatedActor = await AuthenticationService.getSessionActor();

  if (authenticatedActor) {
    return rpcSuccessResponse(authenticatedActor);
  }

  return rpcErrorResponse({ message: "Not authenticated" });
}, "authentication:session");

export const [AuthenticationProvider, useAuthentication] =
  createContextProvider(
    () => {
      const authenticatedActor = createAsync(() => routeData());

      return { actor: () => authenticatedActor()?.data || null };
    },
    { actor: () => null },
  );

export const useAuth = useAuthentication;
