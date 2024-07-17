import { GenericIssue, flatten } from "valibot";

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
