import { SubmitHandler, createForm, valiForm } from "@modular-forms/solid";
import { action, redirect, useAction } from "@solidjs/router";
import * as argon2 from "argon2";
import { eq } from "drizzle-orm";
import * as v from "valibot";

import { Button } from "~/components/ui/button";
import { Input, renderField } from "~/components/ui/form";

import * as AuthenticationService from "~/lib/api/authentication/authentication.service";

import { db } from "~/lib/db";

import { actors } from "~/lib/db/schema";

import { to } from "~/lib/utils/common";

import {
  rpcErrorResponse,
  rpcSuccessResponse,
  rpcValidationErrorResponse,
} from "~/lib/utils/rpc";

export const SignInSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),

  redirectTo: v.optional(v.string()),
});

export type SignInSchemaInput = v.InferInput<typeof SignInSchema>;

const signInAction = action(async (payload: SignInSchemaInput) => {
  "use server";

  const sessionActor = await AuthenticationService.getSessionActor();

  if (sessionActor) {
    return rpcErrorResponse({ message: "Already authenticated" });
  }
  const parsed = await v.safeParseAsync(SignInSchema, payload);

  if (!parsed.success) {
    return rpcValidationErrorResponse(parsed.issues);
  }

  const { email, password, redirectTo } = parsed.output;

  const [err, matchingActor] = await to(
    db.query.actors.findFirst({
      where: () => eq(actors.email, email),
    }),
  );

  if (err) {
    return rpcErrorResponse(err);
  }

  if (!matchingActor) {
    return rpcErrorResponse({ message: "Invalid credentials" });
  }

  const isValidPassword = await argon2.verify(
    matchingActor.encryptedPassword,
    password,
  );

  if (!isValidPassword) {
    return rpcErrorResponse({ message: "Invalid credentials" });
  }

  const session = await AuthenticationService.getSession();

  session.update({ actorId: matchingActor.id });

  if (redirectTo?.length) {
    throw redirect(redirectTo);
  }

  return rpcSuccessResponse(matchingActor);
});

export type SignInFormProps = Pick<SignInSchemaInput, "redirectTo">;

export function SignInForm(props: SignInFormProps) {
  const [, { Form, Field }] = createForm<SignInSchemaInput>({
    validate: valiForm(SignInSchema),
  });
  const triggerAction = useAction(signInAction);

  const handleSubmit: SubmitHandler<SignInSchemaInput> = (values) => {
    triggerAction({ ...values, redirectTo: props.redirectTo });
  };

  return (
    <Form class="grid gap-2" onSubmit={handleSubmit}>
      <Field name="email">
        {renderField((store, props) => (
          <Input
            size="xl"
            type="email"
            placeholder="Email"
            value={store.value}
            {...props}
          />
        ))}
      </Field>

      <Field name="password">
        {renderField((store, props) => (
          <Input
            size="xl"
            type="password"
            placeholder="Password"
            value={store.value}
            {...props}
          />
        ))}
      </Field>

      <Button size="xl" type="submit">
        Sign in
      </Button>
    </Form>
  );
}
