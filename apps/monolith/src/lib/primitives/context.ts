import {
  JSX,
  ParentProps,
  createComponent,
  createContext,
  useContext,
} from "solid-js";

// https://primitives.solidjs.community/package/context#createcontextprovider
export type SafeContextProps = {
  children?: JSX.Element;
} & Record<string, unknown>;

export type ContextProvider<T extends SafeContextProps> = (
  props: ParentProps<T>,
) => JSX.Element;

export function createSafeContext<T, P extends SafeContextProps>(
  factoryFn: (props: P) => T,
  defaults: T,
): [provider: ContextProvider<P>, useSafeContext: () => T];
export function createSafeContext<T, P extends SafeContextProps>(
  factoryFn: (props: P) => T,
): [provider: ContextProvider<P>, useSafeContext: () => T | undefined];
export function createSafeContext<T, P extends SafeContextProps>(
  factoryFn: (props: P) => T,
  defaultValues?: T,
): [provider: ContextProvider<P>, useSafeContext: () => T | undefined] {
  const context = createContext(defaultValues);

  return [
    (props) =>
      createComponent(context.Provider, {
        value: factoryFn(props),
        get children() {
          return props.children;
        },
      }),
    () => {
      const contextValue = useContext(context);

      if (typeof contextValue === undefined) {
        throw new Error(
          "`useSafeContext` must be used within a SafeContextProvider",
        );
      }

      return contextValue;
    },
  ];
}
