import {
  GenericIssue,
  InferInput,
  ObjectSchema,
  flatten,
  safeParseAsync,
} from "valibot";

import { to } from "~/lib/utils/common";

type GenericIssueFlatErrorMessage = Record<string, string[]>;

export type RPCResponse<
  TValidationErrors extends GenericIssueFlatErrorMessage | null,
  TError = unknown,
  TData = unknown,
> =
  | {
      data: TData;
      error: null;
      validationErrors: null;
      success: true;
    }
  | {
      data: undefined;
      error: TError;
      validationErrors: null;
      success: false;
    }
  | {
      data: undefined;
      error: null;
      validationErrors: TValidationErrors;
      success: false;
    };

export function rpcSuccessResponse<TData = unknown>(
  data: TData,
): RPCResponse<null, null, TData> {
  return {
    data,
    error: null,
    validationErrors: null,
    success: true,
  };
}

export function rpcErrorResponse<TError extends { message: string }>(
  error: TError,
): RPCResponse<null, string, undefined> {
  return {
    data: undefined,
    error: error.message,
    validationErrors: null,
    success: false,
  };
}

export function rpcValidationErrorResponse(
  errors: [GenericIssue, ...GenericIssue[]],
): RPCResponse<GenericIssueFlatErrorMessage, null, undefined> {
  return {
    data: undefined,
    error: null,
    validationErrors:
      (flatten(errors).nested as GenericIssueFlatErrorMessage) || null,
    success: false,
  };
}

// TODO: Finish types & functionality
export function createRPC<
  In extends ObjectSchema<any, any>,
  Out extends ObjectSchema<any, any>,
  HandlerReturn extends unknown,
>(config: {
  input?: In;
  output?: Out;
  preHandler?: [];
  handler: (input: InferInput<In>) => Promise<HandlerReturn>;
}) {
  return async (input: InferInput<In>) => {
    "use server";

    if (input) {
      if (config.input) {
        const parsed = await safeParseAsync(config.input, input);

        if (!parsed.success) {
          return rpcValidationErrorResponse(parsed.issues);
        }
      }
    }

    // TODO: Run prehandlers

    const [err, result] = await to(config.handler(input));

    if (err) {
      return rpcErrorResponse(err);
    }

    if (config.output) {
      const parsed = await safeParseAsync(config.output, result);

      if (!parsed.success) {
        return rpcValidationErrorResponse(parsed.issues);
      }

      return rpcSuccessResponse(parsed.output);
    }

    return rpcSuccessResponse(result);
  };
}
