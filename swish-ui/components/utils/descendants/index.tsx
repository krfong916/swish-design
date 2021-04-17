// returns the correct index of the element
// focuses on the next descendant
import * as React from "react";
import { createNamedContext } from "../createNamedContext";

/**
 * Defines the Descendant object
 * @type {Descendant}
 */
export type Descendant = {
  element: HTMLElement;
  // index?: number;
  // focus?: boolean;
};

/**
 * Defines the context values available for consumer components
 * @type {DescendantType} The type is explicitly defined in the calling component
 */
export interface DescendantContext<DescendantType extends Descendant> {
  register: (descendant: Descendant) => void;
  unregister: (element: HTMLElement) => void;
  descendants: Descendant[];
}

/**
 * Creates the descendant context for the top-level calling component
 * createNamedContext calls the createContext hook
 * with the default value and Descendant Context object
 * @param {name} display name
 * @param {defaultValue} any default values
 * @return {React.Context<InferredType>} Descendant Context for the calling component
 */
export function createDescendantContext<DescendantType extends Descendant>(
  name = "",
  defaultValue = {},
) {
  type T = DescendantContext<DescendantType>;
  const descendants: Descendant[] = [];
  return createNamedContext<T>(name, {
    register: () => {},
    unregister: () => {},
    descendants,
    ...defaultValue,
  });
}

/**
 * Returns the array of descendants and a setter function to enable addition of descendants
 */
export function useDescendantsInit<DescendantType>() {
  return React.useState<DescendantType[]>([]);
}

/**
 * Creates a Provider for the top-level component
 * The Descendant Provider contains state of the descendants and functions to update that state
 * Expect the Provider to be called when the state of a descendant changes
 */
export function DescendantProvider<DescendantType extends Descendant>({
  context: Context,
  setDescendants,
  descendants,
  children,
}: {
  context: React.Context<DescendantContext<DescendantType>>;
  setDescendants: React.Dispatch<React.SetStateAction<DescendantType[]>>;
  descendants: DescendantType[];
  children: React.ReactNode;
}) {
  /**
   * register is a wrapper for setDescendants (setState hook)
   * the useCallback hook is used here because the top-level component will often re-render due to state change
   * however, the configuration of descendants will not need to re-render.
   * When the descendants list changes i.e. unregister, we will re-render
   *
   * Experiment: remove use callback and see how it affects rendering
   */
  const register = React.useCallback(element => {
    setDescendants((previousDescendantsState: DescendantType[]) => {
      let newDescendantsState: DescendantType[];

      // if the list is empty, add the new descendant
      if (newDescendantsState.length === 0) {
        newDescendantsState = [
          ...newDescendantsState,
          { element } as DescendantType,
        ];
      } else if (
        // if the element already exists in the list of descendants, return the original list
        newDescendantsState.find(descendant => descendant.element === element)
      ) {
        newDescendantsState = previousDescendantsState;
      } else {
        // we know the element does not exist in the list of descendants
        // compare the element with all *other* *Nodes in the document !important*
        // get the index that it appears in the n-ary tree
        const index = newDescendantsState.findIndex(descendant => {
          return Boolean(
            descendant.element.compareDocumentPosition(element) &
              Node.DOCUMENT_POSITION_PRECEDING,
          );
        });
        const curr = { element } as DescendantType;
        // append the element to the end
        if (index === -1) {
          newDescendantsState = [...newDescendantsState, curr];
        } else {
          // insert the element in-place
          newDescendantsState = [
            ...newDescendantsState.slice(0, index),
            curr,
            ...newDescendantsState.slice(index, newDescendantsState.length),
          ];
        }
      }

      return newDescendantsState;
    });
  }, []);

  const unregister = React.useCallback(element => {
    setDescendants((previousDescendantsState: DescendantType[]) => {
      let newDescendantsState = [...previousDescendantsState];
      // return the list of descendants without the element specified
      return newDescendantsState.filter(d => d.element !== element);
    });
  }, []);

  return (
    <Context.Provider
      value={{
        register,
        unregister,
        descendants,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useDescendant<DescendantType extends Descendant>(
  element: HTMLElement | null,
  context: React.Context<DescendantContext<DescendantType>>,
) {
  // throw error if we cannot find a matching context (did you forget to render etc.?)
  const { register, unregister, descendants } = React.useContext(context);
}

//   context: Context,
//   setFn,
//   descendants,
//   children
// }: {
//   context: React.Context<{}>;
//   // make the type of react dispatch action as an extendable descendant type
//   setFn: React.Dispatch<React.SetStateAction<Descendant[]>>;
//   descendants: Descendant[];
//   children: React.ReactNode
// }) {
//   let register = (element: HTMLElement, index?: number) => {
//     // if the element does not have a position amongst other descendants

//     // if the element is the right-most descendant in the n-ary tree of descendants
//     // append the element to the list of descendants
//     if (!index || index > descendants.length) {
//       descendants.push({ element, index, focus: false });
//     } else {
//       console.log("other condition");
//     }
//   };

//   let unregister = () => {};

//   return (
//     <Context.Provider
//       value={React.useMemo(
//         () => ({
//           register,
//           unregister,
//         }),
//         [],
//       )}
//     ></Context.Provider>
//   );
// }

// export function useDescendant(context) : number {
//   const {register, unregister} = React.useContext(context)
//   let index
//   return index
// }

// export function useDescendantsInit() {
//   return React.useState<Descendant[]>([]);
// }
