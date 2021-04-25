import { createContext } from "react";
import type * as React from "react";

export function createNamedContext<ContextValueType>(
  name: string,
  initialValue: ContextValueType,
): React.Context<ContextValueType> {
  const Context = createContext<ContextValueType | undefined>(initialValue);
  Context.displayName = name;
  return Context;
}
