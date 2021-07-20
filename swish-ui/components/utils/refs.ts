type ReactRef<RefType> =
  | React.MutableRefObject<RefType>
  | React.RefObject<RefType>
  | React.Ref<RefType>;

/**
 * Assigns a ref instance variable to a node (and function:TODO)
 *
 * @param ref  used as an instance variable for some value: either a DOM node or callback
 * @param node the value that the ref will be assigned to - could be a dom node
 *     or, potentially, it could be a function (we'll need to implement that)
 *     because refs can be used as a callback
 */
function assignRef<RefType>(
  ref: ReactRef<RefType> | undefined,
  value: RefType,
) {
  if (ref == null) return;

  if (typeof ref === "function") {
    ref(value);
    return;
  }

  try {
    // @ts-ignore
    ref.current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
}

/**
 * This function is used when the user of our component wants
 * to forward refs onto our component.
 * We merge potentially many ref objects to an assigned value.
 *
 * @param refs refs to assign the node/value to.
 *     Some refs from our internal implemenatation and some from the user forwarding.
 */
export function mergeRefs<RefType>(...refs: ReactRef<RefType | null>[]) {
  return (node: RefType | null) => {
    refs.forEach(ref => {
      assignRef(ref, node);
    });
  };
}
