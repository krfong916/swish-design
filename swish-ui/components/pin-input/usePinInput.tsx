import * as React from "react";
import {
  DescendantProvider,
  useDescendants,
  useDescendant,
  getDescendants,
  Descendant,
  createDescendantContext,
} from "../utils/descendants/index";
import { createNamedContext } from "../utils/createNamedContext";
import { mergeRefs } from "../utils/refs";
import classNames from "classnames";

export interface PinProps {
  /**
   * The type of values that the Pin allows.
   */
  inputType?: PinType;
  /**
   * The children of the Pin component.
   */
  children?: React.ReactElement[];
  variant?: PinVariant;
  size?: PinSize;
  onFocus?: (
    ref: React.MutableRefObject<HTMLInputElement>,
  ) => (e: React.SyntheticEvent) => void;
  /**
   * The function that's called when the user has input valid values.
   *
   * @return string Returns the pin code.
   */
  onComplete?: (s: string) => void;
  /**
   * Specifies whether or not the user would like the first Pin Field focused on render
   */
  autoFocus?: boolean;
  /**
   * Grants control to the user over Pin focus behavior
   */
  manageFocus?: boolean;
  /**
   * Grants control to the user over the styling of the Top-Level Pin component
   */
  manageStyle?: boolean;
  classes?: string;
  /**
   * The placeholder for the pin input
   */
  placeholder?: string
}

export type PinType = "numeric" | "alphanumeric";
export type PinSize = "small" | "medium" | "large";
export type PinColor = "blue" | "green" | "purple";
export type PinErrorColor = "red" | "orange" | "yellow";
export type PinVariant = "outline" | "unstyled" | "filled" | "flushed";

export const PinContext = createNamedContext<PinInternalContext>(
  "PinContext",
  {} as PinInternalContext,
);

export interface PinInternalContext {
  /**
   * Prop-Getter for the Pin Field Component
   */
  getInternalPinProps: (t: {}) => {};
}

/** a pin descendant is an input field DOM node */
export type PinInputDescendant = Descendant & {
  /**
   * Sets the pin to the disabled state
   */
  disabled: boolean;
};

export const PinDescendantContext = createDescendantContext<PinInputDescendant>(
  "PinDescendantContext",
);

// Type '{ children: ReactElement<any, string | JSXElementConstructor<any>>[]; context: PinInternalContext; }' is not assignable to type 'IntrinsicAttributes & PinInternalContext'.
//   Property 'children' does not exist on type 'IntrinsicAttributes & PinInternalContext'.

// function PinContextProvider(context: PinInternalContext, children: React.ReactElement[]): JSX.Element
export interface PinContextProviderProps {
  descendants: PinInputDescendant[];
  setDescendants: React.Dispatch<React.SetStateAction<PinInputDescendant[]>>;
  context: PinInternalContext;
}

export function PinContextProvider({
  context: Context,
  children,
}: {
  context: PinContextProviderProps;
  children: React.ReactElement | React.ReactElement[];
}) {
  const { descendants, setDescendants, context } = Context;

  return (
    <DescendantProvider
      setDescendants={setDescendants}
      descendants={descendants}
      context={PinDescendantContext}
    >
      <PinContext.Provider value={context}>{children}</PinContext.Provider>
    </DescendantProvider>
  );
}

export function usePinInput(props: PinProps) {
  const {
    children,
    onComplete,
    onFocus,
    inputType = "alphanumeric",
    autoFocus = true,
    manageFocus = true,
    manageStyle = false,
    classes = "",
    variant = "outline",
    size = "medium",
    placeholder = "○",
  } = props;
  const [descendants, setDescendants] = useDescendants<PinInputDescendant>();
  const [pinValues, setPinValues] = React.useState<string[]>([]);
  const [focusedIndex, setFocusedIndex] = React.useState(-1)

  React.useEffect(() => {
    const firstPin = descendants[0];
    if (firstPin && autoFocus) {
      firstPin.element.focus();
    }
    // only place focus when descendants change
  }, [descendants]);

  /**
   * Handles change events to pins except for backspaces and deletes.
   * This fn handles two behaviors: update the focus and value states.
   *
   * @param  index The order that the pin field appears in the document
   *     the index is derived from the entries that exist in descendants
   * @param  e     The change event from user input
   */
  const onChange = (index: number) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const currentPinValue = pinValues[index];
    let nextPinValue: any = e.currentTarget.value as string;
    // suppose val = 1 and the user inputs 9, e.currentTarget.value == 19
    // however, we want the most recently input character, 9
    nextPinValue =
      nextPinValue.length > 1 ? nextPinValue.charAt("1") : nextPinValue;
      const nextPin = descendants[index + 1]
        ? descendants[index + 1]
        : descendants[index];
    if (validate(inputType, nextPinValue)) {
      nextPin.element.focus();
      setPinValue(nextPinValue, index);
    }
  };

  /**
   * Handles backspace and delete events.
   * This fn moves focus to the previous input and updates state.
   *
   * @param  index The order that the pin field appears in the document
   *     the index is derived from the entries that exist in descendants
   * @param  e     The change event from user input
   */
  const onKeyDown = (index: number) => (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const currentPinValue = pinValues[index];
    const nextPinValue = e.currentTarget.value;
    const previousPin = descendants[index - 1];
    const BACKSPACE = 8,
      DEL = 42,
      userKey = e.keyCode;
    if (userKey === BACKSPACE || userKey === DEL) {
      if (!currentPinValue) {
        previousPin?.element.focus();
        setPinValue("", index - 1); // clear the character in the previous cell
      } else {
        setPinValue("", index); // a value in the cell already exists
      }
    }
  };

  /**
   * Sets the new value of a pin within the pin code
   *
   * @param  value The new value of the pin
   * @param  index The index of the pin to update
   */
  const setPinValue = (value: string, index: number) => {
    let newPinValues = pinValues.length
      ? [...pinValues]
      : new Array(descendants.length).fill("");
    newPinValues[index] = value;
    const isComplete = newPinValues.every(pin => pin !== "");
    if (isComplete) {
      onComplete?.(newPinValues.join(""));
    }
    setPinValues(newPinValues);
  };

  const pinClasses = manageStyle ? classes 
  : classNames({
    [`s-pin-${variant}`]: true,
    [`s-pin-${size}`]: true,
  })

  /**
   * A prop-getter for pin children.
   *
   * @param  index
   *     The order that the pin field appears in the document
   *     the index is derived from the entries that exist in descendants
   * @return Object: InternalPinProps
   *     The returned object defines properties for the common use-cases
   *     of our pin component. It's what makes a pin "a pin"
   */
  const getInternalPinProps = React.useCallback(
    (props) => {
      const { index, ...rest } = props;
      return {
        ...rest,
        pinClasses,
        onChange: onChange(index),
        onKeyDown: onKeyDown(index),
        value: pinValues[index] || "",
        type: "text",
        placeholder,
        maxLength: 1,
        "aria-label": `digit ${index + 1} of ${descendants.length}`,
      };
    },
    [onChange, pinValues],
  );

  const context = {
    getInternalPinProps,
  } as PinInternalContext;

  return {
    context,
    descendants,
    setDescendants,
  };
}

function validate(type: PinType, value: string): boolean {
  const numbersOnly: boolean = type === "numeric" ? true : false;
  const letterOrNumber = /[(0-9) | (a-z) | (A-Z)]/g;
  const letter = /[(a-z) | (A-Z)]/g;

  if (!value.match(letterOrNumber)) return false;
  if (numbersOnly && value.match(letter)) return false;
  // the value is not a special character & is alphanum || strictly alpha
  return true;
}

export interface PinFieldProps {
  classes?: string
  /**
   * Grants control to the user over the styling of the Top-Level Pin component
   */
  manageStyle?: boolean;
}

export interface UsePinFieldProps {
  pinClasses: string
}

export function usePinField(
  props: PinFieldProps = {},
  userRef: React.Ref<any> = null,
) {
  const ownRef = React.useRef(null);
  const { getInternalPinProps } = React.useContext(PinContext);
  const index = useDescendant(
    {
      element: ownRef.current,
      disabled: false,
    },
    PinDescendantContext,
  );

  return getInternalPinProps({ index, ref: mergeRefs(ownRef, userRef) }) as UsePinFieldProps;
}