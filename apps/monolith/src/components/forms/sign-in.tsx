import { SubmitHandler, createForm, valiForm } from "@modular-forms/solid";
import * as v from "valibot";

import { Button } from "~/components/ui/button";
import { Input, renderField } from "~/components/ui/form";

export const Schema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),

  redirectTo: v.optional(v.string()),
});

export type SchemaType = v.InferInput<typeof Schema>;

export type SignInFormProps = Pick<SchemaType, "redirectTo">;

export function SignInForm(props: SignInFormProps) {
  const [, { Form, Field }] = createForm<SchemaType>({
    validate: valiForm(Schema),
  });

  const handleSubmit: SubmitHandler<SchemaType> = (values) => {
    console.log(values);
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
