import * as React from "react";
import {
  DescendantProvider,
  useDescendants,
  useDescendant,
  Descendant,
  getDescendants,
  createDescendantContext,
} from "../utils/descendants/index";
import { createNamedContext } from "../utils/createNamedContext";
import classNames from "classnames";
import "./styles/pinInput.scss";

export type PinInputDescendant = Descendant & {
  focusable: boolean;
  disabled: boolean;
};

const PinDescendantContext = createDescendantContext<PinInputDescendant>(
  "PinDescendantContext",
);

const PinContext = createNamedContext<PinInternalContext>(
  "PinContext",
  {} as PinInternalContext,
);

export type PinType = "numeric" | "alphanumeric";
export type PinColor = "blue" | "green" | "purple";
export type PinErrorColor = "red" | "orange" | "yellow";

interface PinInternalContext {
  getPinProps: (index: number) => {};
}

export interface PinProps {
  type: PinType;
  children?: React.ReactElement[];
  onCompleted?: (e: any) => void;
  autoFocus?: boolean;
}

export const PinInput = (props: PinProps) => {
  const { type = "alphanumeric", children, autoFocus = true } = props;
  const [descendants, setDescendants] = useDescendants<PinInputDescendant>();
  const [pinValues, setPinValues] = React.useState<string[]>([]);

  React.useEffect(() => {
    const firstPin = descendants[0];
    if (firstPin && autoFocus) {
      firstPin.element.focus();
    }
    // only place focus when descendants change
  }, [descendants]);

  /**
   WIP: onkeydown for backspace, and onChange

   The tale of three conditions:

   1: Pin code is complete -> call on complete (delegated to useEffect)

   2: User input is a backspace and a value already exists in input field -> keep focus, update state

   3: User input is a backspace and a value DOESNT exist in the input field -> move focus

   4. User input is valid -> move focus
   */
  const onChange = (index: number) => (
    e?: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const currentPinValue = pinValues[index];
    const nextPinValue = e.currentTarget.value;

    if (nextPinValue === "" && !currentPinValue.charAt(0)) {
      const nextPinToRecieveFocus = descendants[index - 1];
      // check if backspace on first pin: array out of bounds exc.
      if (nextPinToRecieveFocus) {
        nextPinToRecieveFocus.element.focus();
      }
    }

    if (validate(type, nextPinValue) || nextPinValue === "") {
      // set the new pin value
      const newPinValues = [...pinValues];
      newPinValues[index] = nextPinValue;
      setPinValues(newPinValues);
    }
  };

  React.useEffect(() => {
    const values = pinValues.join("");
    if (values.length == descendants.length && values.length != 0) {
    }
  }, [pinValues]);

  const getPinProps = React.useCallback(
    (index: number) => {
      return {
        onChange: onChange(index),
        value: pinValues[index] || "",
      };
    },
    [onChange, pinValues],
  );

  const context = {
    getPinProps,
  } as PinInternalContext;

  return (
    <DescendantProvider
      setDescendants={setDescendants}
      descendants={descendants}
      context={PinDescendantContext}
    >
      <PinContext.Provider value={context}>{children}</PinContext.Provider>
    </DescendantProvider>
  );
};

export interface PinFieldProps {}

/**
 * @desc PinField is an input element that accepts a single character
 * It is used its parent <PinInput/> to create a Pin number
 * We use forwardRef because if we passed a ref to PinField,
 * the parent component would have reference to the PinField and not the DOM node itself
 * Note: type parameters have the opposite ordering
 */
export function PinField() {
  const ownRef = React.useRef<HTMLInputElement | null>();
  const { getPinProps } = React.useContext(PinContext);

  const index = useDescendant(
    {
      element: ownRef.current,
      focusable: true,
      disabled: false,
    },
    PinDescendantContext,
  );

  return (
    <div className="pin-input-field">
      <input
        className="s-pin-input-field"
        ref={ownRef}
        {...getPinProps(index)}
      />
    </div>
  );
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
