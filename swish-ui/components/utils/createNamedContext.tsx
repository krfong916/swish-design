import React from "react";

export function createNamedContext<ContextValueType>(
  name: string,
  initialValue: ContextValueType,
) {
  const Context = React.createContext<ContextValueType>(initialValue);
  Context.displayName = name;
  return Context;
}
