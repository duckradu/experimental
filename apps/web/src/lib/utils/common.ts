import { customAlphabet } from "nanoid";
import { ClassValue } from "tailwind-variants";

export const __isDev__ = process.env.NODE_ENV === "development";

export const NANO_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
export const NANO_LENGTH = 12;

export const nanoid = customAlphabet(NANO_ALPHABET, NANO_LENGTH);

export function sample<T extends any>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

export function noop(...args: any[]) {}

// https://github.com/scopsy/await-to-js/blob/master/src/await-to-js.ts
export function to<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object,
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }

      return [err, undefined];
    });
}
