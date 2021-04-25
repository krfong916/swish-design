import * as React from "react";
import { createNamedContext } from "../createNamedContext";

/**
SomeElement is a generic type

GenericType extends HTMLElement describes the relationship test

If the type GenericType is assignable to the type HTMLElement

select HTMLElement; otherwise select the type Element

In order to make the resulting type no longer generic,

Specify the type parameter to use it as a type of a value
*/
type SomeElement<GenericType> = GenericType extends Element
  ? GenericType
  : Element;

/**
The default type for ElementType is HTMLElement

A descendant is of some element type - we don't know exactly what

@type {Descendant} the base descendant type
*/
type Descendant<ElementType = HTMLElement> = {
  element: SomeElement<ElementType>;
};

/**
 * Defines the context values available for consumer components
 * @type {DescendantType} The type is explicitly defined in the calling component
 */
export interface DescendantContext<DescendantType extends Descendant> {
  subscribe: (d: DescendantType) => void;
  unsubscribe: (d: DescendantType) => void;
  descendants: DescendantType[];
}

const noop = () => {};

// name the context that we are creating
export function createDescendantContext<DescendantType extends Descendant>(
  name: string,
) {
  const descendants: DescendantType[] = [];
  const contextValue = {
    subscribe: noop,
    unsubscribe: noop,
    descendants,
  } as DescendantContext<DescendantType>; // type this object, b/c we want to know what kind of object this is
  return createNamedContext(name, contextValue);
}

/**
Creates the descendants list for the current context
*/
export function useDescendants<DescendantType>() {
  return React.useState<DescendantType[]>([]);
}

/**
Creates a stateful pub/sub object for the top-level component to manage

This function implements the ideas of the Provider pattern at its core

Contains state of the descendants and functions to update that state
*/
export function DescendantProvider<DescendantType extends Descendant>({
  setDescendants,
  context: Context,
  descendants,
  children,
}: {
  setDescendants: React.Dispatch<React.SetStateAction<DescendantType[]>>;
  descendants: DescendantType[];
  context: React.Context<DescendantContext<DescendantType>>;
  children: React.ReactNode;
}) {
  // we are missing the ability to add extra props, such as focusable and disabled
  // the arguments and typings will need to change
  let subscribe = React.useCallback(({ element, ...props }: DescendantType) => {
    if (!element) return;
    setDescendants(prevDescendants => {
      let newDescendants: DescendantType[];
      let immutable = [...prevDescendants];

      // if empty: append
      if (immutable.length === 0) {
        newDescendants = append(element, props, prevDescendants);
      }

      // if element exists: copy
      else if (immutable.find(desc => desc.element === element)) {
        newDescendants = prevDescendants;
      }

      // insert in relative order: in-place or append
      else {
        newDescendants = insert(element, props, prevDescendants);
      }

      return newDescendants;
    });
  }, []);

  let unsubscribe = React.useCallback(
    ({ element }: { element: DescendantType["element"] }) => {
      if (!element) {
        return;
      }

      setDescendants(prevDescendants =>
        prevDescendants.filter(desc => desc.element !== element),
      );
    },
    [],
  );

  return (
    <Context.Provider
      value={React.useMemo(() => {
        return {
          subscribe,
          unsubscribe,
          descendants,
        };
      }, [subscribe, descendants, unsubscribe])}
    >
      {children}
    </Context.Provider>
  );
}

/**
Registers the element as a descendant

@return {number} returns an index the descendant occurs in the list of descendants
*/
export function useDescendant<DescendantType extends Descendant>(
  descendant: DescendantType,
  context: React.Context<DescendantContext<DescendantType>>,
) {
  const { subscribe, unsubscribe, descendants } = React.useContext(context);
  const forceUpdate = useForceUpdate();
  const index = descendants?.findIndex(
    desc => desc.element === descendant.element,
  );

  // area of concern - do we need useLayoutEffect and why? see server-side rendering and force update
  React.useLayoutEffect(() => {
    if (!descendant.element) {
      forceUpdate();
    }
    subscribe(descendant);
    return () => unsubscribe(descendant);
  }, [
    index,
    forceUpdate,
    subscribe,
    unsubscribe,
    ...Object.values(descendant),
  ]);

  return index;
}

export function getDescendants<DescendantType extends Descendant>(
  context: React.Context<DescendantContext<DescendantType>>,
) {
  const { descendants } = React.useContext(context);
  return descendants;
}

/**
 * Utility Methods for useDescendants
 * It's down here, because it ain't pretty for reading up there, haha
 */
function append<DescendantType extends Descendant>(
  element: DescendantType["element"],
  props: {},
  prevDescendants: DescendantType[],
) {
  return [
    ...prevDescendants,
    {
      element,
      ...props,
    } as DescendantType,
  ];
}

function insert<DescendantType extends Descendant>(
  element: DescendantType["element"],
  props: {},
  prevDescendants: DescendantType[],
) {
  let newDescendants: DescendantType[];
  let index = getIndex(element, prevDescendants);

  const currDescendant = { element, ...props } as DescendantType;

  if (index === -1) {
    // the element appears at the relative end of the n-ary tree of descendants
    newDescendants = [...prevDescendants, currDescendant];
  } else {
    // insert in place
    newDescendants = [
      ...prevDescendants.slice(0, index),
      currDescendant,
      ...prevDescendants.slice(index, prevDescendants.length),
    ];
  }
  return newDescendants;
}

function getIndex<DescendantType extends Descendant>(
  element: DescendantType["element"],
  immutable: DescendantType[],
): number {
  return immutable.findIndex(desc => {
    if (!desc.element || !element) {
      return false;
    }

    // we want to insert the element in the order that it appears in the document
    return Boolean(
      element.compareDocumentPosition(desc.element) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
}

function usePrevious<ValueType = any>(value: ValueType) {
  const ref = React.useRef<ValueType | null>(null);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function useForceUpdate() {
  let [, dispatch] = React.useState<{}>(Object.create(null));
  return React.useCallback(() => {
    dispatch(Object.create(null));
  }, []);
}

export type { Descendant };