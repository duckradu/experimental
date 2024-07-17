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

export const createMergedVariantSlotClasses =
  <
    TVArg extends Record<string, ClassValue>,
    TV extends (
      arg: TVArg,
    ) => Record<string, (args: { class: ClassValue }) => string>,
  >(
    tv: TV,
    tvArg: TVArg,
  ) =>
  (slotKey: keyof ReturnType<TV>, extendClass?: ClassValue) =>
    tv(tvArg)[slotKey as string]({
      class: [tvArg[`${slotKey as string}Class`], extendClass],
    });

export function fullNameToAvatarFallback(fullName: string | null) {
  if (!fullName?.length) {
    return "";
  }

  return fullName
    .split(" ")
    .map(([s]) => s)
    .join("");
}
