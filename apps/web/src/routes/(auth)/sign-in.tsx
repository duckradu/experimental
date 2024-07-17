import { A, Navigate, useSearchParams } from "@solidjs/router";

import { SignInForm } from "~/components/forms/sign-in";
import { Title } from "~/components/title";
import { Icon } from "~/components/ui/icon";

import { useAuth } from "~/providers/authentication";

export default function SignIn() {
  const { actor } = useAuth();

  if (actor()) {
    return <Navigate href="/" />;
  }

  const [searchParams] = useSearchParams();

  return (
    <>
      <Title>Sign in</Title>

      <div class="flex flex-col gap-2 text-center">
        <A href="/" class="mx-auto">
          <Icon.logo.bold class="w-8 h-8" />
        </A>
        <h1 class="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p class="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      <SignInForm redirectTo={searchParams["redirect-to"] || "/"} />

      {/* <div class="flex justify-between text-sm text-accent [&>a:hover]-(underline underline-offset-3)">
        <A href={paths.auth.signUp}>Create an account</A>
        <A href="/recover-access">Forgot your password?</A>
      </div> */}
    </>
  );
}
