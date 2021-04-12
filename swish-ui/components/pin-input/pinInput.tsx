import React, { useRef, useEffect, useState } from "react";
import classNames from "classnames";
import "./styles/pinInput.scss";

export type PinType = "numeric" | "alphanumeric";
export type PinColor = "blue" | "green" | "purple";
export type PinErrorColor = "red" | "orange" | "yellow";

export interface PinProps {
  type: PinType;
  children?: React.ReactElement[];
  onChange?: (e: any) => void;
}

export const PinInput = (props: PinProps) => {
  const { type = "alphanumeric", children, onChange } = props;

  // we want custom, fine-grained control over how our input forms should work
  // we want to place focus on the next child
  const [pinCode, setPinCode] = useState(Array(children.length).fill(""));
  const pinFields = useRef([]);

  // after the first render, focus the first pin field
  useEffect(() => {
    pinFields.current[0].focus();
  }, []);

  const updatePin = (value: string, childId: number) => {
    pinCode[childId] = value;
    const newPinCode = pinCode.reduce((newPinCode, current) => {
      if (current) {
        return newPinCode + current;
      } else {
        return newPinCode;
      }
    }, "");
    console.log(newPinCode);

    setPinCode(pinCode);
    // 1. focus management
    // 2. updating our state: don't change the state if we don't have any updates to make
    // so we don't trigger any unnecessary re-renders (backspaces and typing the same character in the same box)

    // 3. execute onChange callback when state changes
    // 4. call onCompletedInput()
    // 5. focus error
    // 6. error message
    // --> screams control props - because we have to allow the user manage our state
    // 7. error message to user if they don't specify pinFields

    // if (result == code.length) {
    //   onCompletedInput()
    // }
    // const newPinCode = pinCode
    // setPinCode()
  };

  const clonedChildren = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      updatePin,
      type,
      childId: index,
      ref: (ref: any) => (pinFields.current[index] = ref),
    });
  });

  return <div className="s-pin-input">{clonedChildren}</div>;
};

const BACKSPACE = 8;
export interface PinFieldProps {}

/**
 * @desc PinField is an input element that accepts a single character
 * It is used its parent <PinInput/> to create a Pin number
 * We use forwardRef because if we passed a ref to PinField,
 * the parent component would have reference to the PinField and not the DOM node itself
 * Note: type parameters have the opposite ordering
 */
export const PinField = React.forwardRef<HTMLInputElement, PinFieldProps>(
  (props: any, ref: any) => {
    const [value, setValue] = useState("");
    const [renderCount, setRenderCount] = useState(-1);

    const handlePinChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { value: initialValue } = e.currentTarget;
      const childId = e.currentTarget.getAttribute("childid");
      const key = e.keyCode;
      let newInputValue = e.key;

      if (key == BACKSPACE) {
        newInputValue = "";
        props.updatePin(newInputValue, childId);
        setValue(newInputValue);
      }

      if (isValidInput(props.type, newInputValue)) {
        props.updatePin(newInputValue, childId);
        setValue(newInputValue);
      }
    };

    return (
      <div className="pin-input-field">
        <input
          value={value}
          onKeyDown={handlePinChange}
          className="s-pin-input-field"
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

function isValidInput(type: PinType, value: string): boolean {
  const numbersOnly: boolean = type === "numeric" ? true : false;
  const letterOrNumber = /[(0-9) | (a-z) | (A-Z)]/g;
  const letter = /[(a-z) | (A-Z)]/g;

  if (!value.match(letterOrNumber)) return false;
  if (numbersOnly && value.match(letter)) return false;
  // the value is either number or letter &&
  // the user has allowed alphanumeric input ||
  // the value is a number and the user only allows a number
  return true;
}

/*
  // i want to get the text from each input child

  const updatePin = (event: React.ChangeEvent<HTMLInputElement>) => {
    useEffect(() => {
      setPin(event.target.value);
    }, [pin]);
  };

  const pinFields = React.useRef<HTMLInputElement[]>([]);

  // we clone the children with the props they need
  const clonedChildren = React.Children.map(children, (child, i) => {
    return React.cloneElement(child, {
      ref: pinFields[i] = child,
      onChange: updatePin,
    });
  });

 */

/* For the user of our component*/
// we want to give the user access to the state of our pininput
// so we call onChange with our pin string in updatePin()
// when
// we perform all our calculations
// &&
// if the pin !== memoPin
//   then call onChange(pin)
//   memoPin = pin

/* Parent component work*/

/* Refs and child stuff */

// state
// our state now is an array - an array that contains string values that map to each child's input value

// in order to map the children to state
// -> we need to be able to reference each input child
// when the input value changes
// the child updates it's own piece of state (in this case, the index in the array)

// also before we update the input value and change the input string text
// i.e. before we update the DOM we want to make sure
// that the input value corresponds with the type of input that we want to accept

// controlled component with hooks and with refs
// we need to control the update to state

// when that happens - we'll call our own functions in the parent component
// such as: focus on the next input child
// make sure: that the string's length === 1
// construct the string

// individual strings - have to be references to the underlying values of each input element
//

// something like
// arr.reduce((str, input) => {
//   return str + input.val
// }, "")

// we want to separate the pin field from the pin itself

// let the user know that they MUST specify an element
// we cannot focus if disabled is true or readonly is true
// apply ref to each child - we must have reference to the DOM node itself
// i want to apply initial focus on the first element

// we need to use refs because we want to use the pin input like we would as a regular input
// we want to get the internal values (what's inputted) from each input

// focusColor: PinColor;
// errorBorderColor: PinErrorColor;
// defaultValue?: string;
// disabled?: boolean;
// uppercase?: boolean;
// private: boolean;
// initialFocus?: boolean;
// onCompletedInput?: (e: any) => void;
// ariaLabel: string;

// initialFocus = true,
// focusColor = "blue",
// errorBorderColor = "red",
// disabled = false,
// uppercase = true,
// onChange,
// ariaLabel,

/*
  type: PinType;

  - must have some useState type of feature - for getting the text input

  - allow for only one input on each field - behavior

  - move to the next input after typing one thing - behavior

  - move to the previous input after deleting one thing - behavior

  - focus on the first input box - behavior

  - onCompletedInput returns true when all the inputs have a value - behavior

  focusColor: PinColor;


  errorBorderColor: PinErrorColor;
  defaultValue?: string;
  disabled?: boolean;
  uppercase?: boolean;
  private: boolean;
  initialFocus?: boolean;
  onChange?: (e: any) => void;
  onCompletedInput?: (e: any) => void;
  children?: React.ReactElement<HTMLInputElement>;
  ariaLabel: string;
*/
/*
import React, { useRef, useEffect, useState } from "react";
import "./styles/pinInput.scss";
export type PinType = "alpha" | "numeric" | "alphaNumeric";
export type PinColor = "blue" | "green" | "purple";
export type PinErrorColor = "red" | "orange" | "yellow";

export interface PinProps {
  type: PinType;
  className?: string;
  children?: React.ReactElement[];
  onChange?: (e: any) => void;
}

export const PinInput = (props: PinProps) => {
  const { type = "alphaNumeric", children, onChange } = props;
  // create pin state
  const [pinChar, setPinChar] = useState<string[]>([]);
  const pinRefs = React.useRef([]);

  const updatePin = (e: KeyboardEvent) => {
    console.log(e.target);
  };
  
  let pinFields: React.ReactElement[] = [];

  const clonedChildren = React.Children.map(children, (child, index) => {
    pinFields[index] = child;
    return React.cloneElement(child, {
      ref: pinRefs[index],
      onChange: updatePin,
      id: index,
    });
  });

  return <div>{clonedChildren}</div>;
};

export interface PinFieldProps {
  name?: string;
}
*/
/**
 * @desc PinField is an input element that accepts a single character
 * It is used its parent <PinInput/> to create a Pin number
 * We use forwardRef because if we passed a ref to PinField,
 * the parent component would have reference to the PinField and not the DOM node itself
 * Note: type parameters have the opposite ordering
 */
// export const PinField = React.forwardRef<HTMLInputElement, PinFieldProps>(
//   (props: PinFieldProps, ref: any) => <input ref={ref} {...props} />,
// );
