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
import { useControllableState } from "../utils/hooks";
import classNames from "classnames";

export interface PinProps {
  /**
   * Allow the pin children to have a default value
   */
  defaultValue?: string;
  /**
   * Controllable value for using the pin input as a controlled component
   */
  value?: string;
  /**
   * The type of values that the Pin allows.
   */
  inputType?: PinType;
  /**
   * The children of the Pin component.
   */
  children?: React.ReactElement[];
  /**
   * Property for pin styling/visual appearance
   */
  variant?: PinVariant;
  /**
   * Size property for the pin
   */
  size?: PinSize;
  /**
   * If you need to assign your event listener for focus events
   *     on focus is your person
   */
  onFocus?: (
    ref: React.MutableRefObject<HTMLInputElement>,
  ) => (e: React.SyntheticEvent) => void;
  /**
   * The function that's called when the user has input valid values.
   *
   * @return string Returns the pin code.
   */
  onComplete?: (pinCode: string, clear: () => void) => void;
  /**
   *
   */
  onChange?: (pin: string) => void;
  // onChange?: (pin: string, permitChange: (pin: string) => void) => void;
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
  /**
   * Combined with manageStyle, defining classes allows for custom control over
   *     pin appearance
   */
  classes?: string;
  /**
   * The placeholder for the pin input
   */
  placeholder?: string;
  /**
   * Specified input type as password
   */
  mask?: boolean;
}

export type PinType = "number" | "text";
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
export type PinInputDescendant = Descendant<HTMLInputElement> & {
  /**
   * Sets the pin to the disabled state
   */
  disabled: boolean;
};

export const PinDescendantContext = createDescendantContext<PinInputDescendant>(
  "PinDescendantContext",
);

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
    inputType = "number",
    autoFocus = true,
    manageFocus = true,
    manageStyle = false,
    classes = "",
    variant = "outline",
    size = "medium",
    placeholder = "○",
    mask = false,

    onChange,
    defaultValue = "",
    value,
  } = props;

  const [descendants, setDescendants] = useDescendants<PinInputDescendant>();
  const [pinValues, setPinValues] = useControllableState<string[]>({
    defaultValue: toArray(defaultValue),
    value: toArray(value),
    onChange: pinValues => onChange?.(pinValues.join("")),
  });

  const [focusedIndex, setFocusedIndex] = React.useState(-1);

  React.useEffect(() => {
    const firstPin = descendants[0];
    if (firstPin && autoFocus) {
      firstPin.element.focus();
    }
    // only place focus when descendants change
  }, [descendants]);

  /**
   * Sets the new value of a pin within the pin code
   * there are two ways to create a new pin code - by paste or by key input
   *
   * @param  value The new value of the pin
   * @param  index The index of the pin to update
   */
  const setPinValue = React.useCallback(
    (inputValue: string, index: number) => {
      let newPinValues = pinValues.length
        ? [...pinValues]
        : new Array(descendants.length).fill("");
      // if pasting a value
      if (inputValue.length > 1) {
        let vIdx = 0;
        let i = index;
        while (vIdx < inputValue.length && i < newPinValues.length) {
          newPinValues[i] = inputValue.charAt(vIdx);
          i++, vIdx++;
        }
      } else {
        newPinValues[index] = inputValue;
      }

      const isComplete =
        inputValue !== "" &&
        newPinValues.every(pin => pin !== "" && pin != null) &&
        newPinValues.length === descendants.length;

      if (isComplete) {
        onComplete?.(newPinValues.join(""), clear);
      }

      setPinValues(newPinValues);
    },
    [pinValues, setPinValues, onComplete, descendants],
  );

  const clear = React.useCallback(() => {
    const initialState = toArray(defaultValue);
    setPinValues(initialState);
    moveFocus(0);
  }, [descendants]);

  const moveFocus = React.useCallback(
    (index: number) => {
      if (focusedIndex != index) {
        setFocusedIndex(index);
      }
    },
    [focusedIndex, setFocusedIndex],
  );

  const pinClasses = manageStyle
    ? classes
    : classNames({
        [`s-pin-${variant}`]: true,
        [`s-pin-${size}`]: true,
      });

  React.useEffect(() => {
    const pin = descendants[focusedIndex];
    if (pin) {
      pin.element.focus();
    }
    // update when the user action requires a focus change on pin
  }, [focusedIndex]);

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
    props => {
      const { index, ...rest } = props;

      const handleFocus = (index: number) => (e: React.FocusEvent<any>) => {
        e.currentTarget.select();
      };

      /**
       * This fn suggests when to move the pin input's focus
       * - for backspace and delete presses
       * - when the user inputs a new value AND it's the same input value
       *     that's already present
       * - and arrow left and right keys (!for open-source contributors!
       *     we can abstract the arrow key events to the descendants module)
       *
       * @param  index The order that the pin field appears in the document
       *     the index is derived from the entries that exist in descendants
       * @param  e     The change event from user input
       */
      const handleKeyDown = (index: number) => (
        e: React.KeyboardEvent<HTMLInputElement>,
      ) => {
        const currentPinValue = pinValues[index];
        const BACKSPACE = 8,
          DEL = 42,
          userKey = e.keyCode;
        const previousPin = descendants[index - 1];
        if (userKey === BACKSPACE || userKey === DEL) {
          if (!currentPinValue) {
            setPinValue("", index - 1); // clear the character in the previous cell
            moveFocus(index - 1);
          } else {
            setPinValue("", index); // a value in the cell already exists
          }
        } else if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
          const arrowMove = e.key;
          if (arrowMove === "ArrowLeft") {
            moveFocus(index - 1);
          } else {
            moveFocus(index + 1);
          }
        } else if (validate(inputType, e.key)) {
          // the user entered the same value that exists within the cell
          moveFocus(index + 1);
        }
      };

      /**
       * Handles change events to pins except for backspaces and deletes.
       * This fn handles a single behaviors: update the value state
       *
       * @param  index The order that the pin field appears in the document
       *     the index is derived from the entries that exist in descendants
       * @param  e     The change event from user input
       */
      const handleChange = (index: number) => (
        e: React.ChangeEvent<HTMLInputElement>,
      ) => {
        const currentPinValue = pinValues[index];
        let nextPinValue: any = e.currentTarget.value as string;
        // suppose val = 1 and the user inputs 9, e.currentTarget.value == 19
        // however, we want the most recently input character, 9
        nextPinValue =
          nextPinValue.length > 1 ? nextPinValue.charAt("1") : nextPinValue;
        if (validate(inputType, nextPinValue)) {
          setPinValue(nextPinValue, index);
          moveFocus(index + 1);
        }
      };

      const handlePaste = (index: number) => (
        e: React.ClipboardEvent<HTMLInputElement>,
      ) => {
        let pasteValue = e.clipboardData.getData("text");
        if (validate(inputType, pasteValue)) {
          setPinValue(pasteValue, index);
          let spliceLen = index + pasteValue.length;
          let nextFocusIndex =
            spliceLen < descendants.length ? spliceLen : descendants.length - 1;
          moveFocus(nextFocusIndex);
        }
      };

      const hasFocus = focusedIndex === index;

      return {
        ...rest,
        autoFocus,
        pinClasses,
        onPaste: handlePaste(index),
        onFocus: handleFocus(index),
        onKeyDown: handleKeyDown(index),
        onChange: handleChange(index),
        value: pinValues[index] || "",
        type: mask ? "password" : "text",
        placeholder: hasFocus ? "" : placeholder,
        maxLength: 1,
        "aria-label": `digit ${index + 1} of ${descendants.length}`,
      };
    },
    [descendants, pinValues, focusedIndex, setPinValue, setPinValues],
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

const toArray = (value?: string) => value?.split("");
function validate(type: PinType, value: string): boolean {
  const numbersOnly: boolean = type === "number" ? true : false;
  const letterOrNumber = /[(0-9) | (a-z) | (A-Z)]/g;
  const letter = /[(a-z) | (A-Z)]/g;

  if (!value.match(letterOrNumber)) return false;
  if (numbersOnly && value.match(letter)) return false;
  // the value is not a special character & is alphanum || strictly alpha
  return true;
}

export interface PinFieldProps {
  classes?: string;
  /**
   * Grants control to the user over the styling of the Top-Level Pin component
   */
  manageStyle?: boolean;
}

export interface UsePinFieldProps {
  pinClasses: string;
}

export function usePinField(
  props: PinFieldProps = {},
  userRef: React.ForwardedRef<React.MutableRefObject<HTMLInputElement>> = null,
) {
  const ownRef = React.useRef(null);
  const { getInternalPinProps } = React.useContext(PinContext);
  const index = useDescendant(
    {
      element: ownRef.current,
      disabled: false,
    } as PinInputDescendant,
    PinDescendantContext,
  );

  return getInternalPinProps({
    index,
    ref: mergeRefs(ownRef, userRef),
  }) as UsePinFieldProps;
}

/**
 * Sources cited:
 * - Chakra UI
 * - Reach UI
 * - Uber Baseweb
 */
