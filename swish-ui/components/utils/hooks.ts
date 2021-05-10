import * as React from "react";

export interface useControllableStateProps<T> {
  defaultValue?: T | ((arg?: T) => void);
  value?: T;
  onChange?: (args: T) => void;
}

export function useControllableState<T>(
  props: useControllableStateProps<T>,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const { defaultValue, onChange, value } = props;

  const controlledUpdater = useCallbackRef(onChange);
  // create internal state for the component just like we would normally w/a
  //     default value if a user has specified
  const [internalState, setState] = React.useState(defaultValue as T);
  // find out if the user wants control over state
  const isControllable = value !== undefined;

  // if the user does want control, do they also want to handle the state updates?
  const state = isControllable ? (value as T) : internalState;

  const stateUpdater = React.useCallback(
    next => {
      if (!isControllable) {
        setState(next);
      }

      controlledUpdater?.(next);
    },
    [value, controlledUpdater, setState, isControllable],
  );

  return [state, stateUpdater];
}

/**
 * React hook to persist any value between renders,
 * but keeps it up-to-date if it changes.
 *
 * @param value the value or function to persist
 */
function useCallbackRef<T extends (...args: any[]) => any>(
  fn: T | undefined,
  deps: React.DependencyList = [],
): T {
  const ref = React.useRef(fn);

  React.useLayoutEffect(() => {
    ref.current = fn;
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(((...args) => ref.current?.(...args)) as T, deps);
}

/**
 * Sources cited:
 * - Chakra UI
 */
