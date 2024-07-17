import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

import "@unocss/reset/tailwind-compat.css";

import "virtual:uno.css";

import { Title } from "~/components/title";

import { AuthenticationProvider } from "~/providers/authentication";

import "~/styles/app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Sprout</Title>
          <Suspense>
            <AuthenticationProvider>{props.children}</AuthenticationProvider>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
