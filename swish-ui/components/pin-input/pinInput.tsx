import React, { useState, useRef, useCallback, useEffect } from "react";
import classNames from "classnames";
import "./styles/pinInput.scss";

export type PinType = "numeric" | "alphanumeric";
export type PinColor = "blue" | "green" | "purple";
export type PinErrorColor = "red" | "orange" | "yellow";

export interface PinProps {
  type: PinType;
  children?: React.ReactElement[];
  onCompleted?: (e: any) => void;
}

// [ ] manage input based on user props
// [ ] focus management - if backspace, move cursor to back, if correct char move next
// [ ] ability to render other components inside the parent
// [ ] copy paste
// [ ] call onCompleted when pin is completed
// [ ] error if rendering a PinField outside of the parent
// [ ] prop-getters
interface PinInputContext {}

const PinInputContext = React.createContext("PinInputContext");

export const PinInput = (props: PinProps) => {
  const { type = "alphanumeric", children } = props;

  const pinChildren = useRef([]); // maintains reference to the pinfield children
  const [currentPin, setCurrentPin] = useState(0); // UI state
  const [pinCode, setPinCode] = useState(""); // pin code, not pin-number b/c we accept alphanumeric
  const [pins, setPins] = useState(Array(children.length).fill("")); // creates an array representation of the pin, "n-n-n-n-n-n": needed to update the pin char in place

  useEffect(() => {
    // when the pin number changes, we want to change the focus
    console.log(currentPin);
    console.log(pinChildren);
    pinChildren.current[currentPin].focus();
  }, [currentPin]);

  const updatePin = (value: string, childId: number) => {
    let newPins = [...pins];
    newPins[childId] = value;
    setPins(newPins);
    const newPinCode = pins.reduce((computed, current) => {
      if (current) return computed + current;
      return computed;
    }, "");

    setPinCode(newPinCode);

    const newCurrentPin =
      childId == children.length - 1 ? childId : childId + 1;
    setCurrentPin(newCurrentPin);
  };

  const handlePinChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value: initialValue } = e.currentTarget;
    const childId = e.currentTarget.getAttribute("child-id");
    const key = e.keyCode;
    let newInputValue = e.key;

    if (key == BACKSPACE) {
      newInputValue = "";
      updatePin(newInputValue, parseInt(childId));
    }

    if (isValidInput(props.type, newInputValue)) {
      updatePin(newInputValue, parseInt(childId));
    }
  };

  const getPinFieldProps = (index: number) => {
    return {
      value: pins[index],
      type,
      childId: index,
      onKeyDown: handlePinChange,
      ref: (ref: any) => (pinChildren.current[index] = ref),
    };
  };

  // // in-flexible, we'll need to refactor to allow rendering of other elements
  const clonedChildren = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, getPinFieldProps(index));
  });

  return <div>{clonedChildren}</div>;
};

const BACKSPACE = 8;
export interface PinFieldProps {
  updatePin?: (value: string, childId: number) => void;
  type?: PinType;
  childId?: number;
}

/**
 * @desc PinField is an input element that accepts a single character
 * It is used its parent <PinInput/> to create a Pin number
 * We use forwardRef because if we passed a ref to PinField,
 * the parent component would have reference to the PinField and not the DOM node itself
 * Note: type parameters have the opposite ordering
 */
export const PinField = React.forwardRef<HTMLInputElement, PinFieldProps>(
  (props: any, ref: any) => {
    return (
      <div className="pin-input-field">
        <input
          className="s-pin-input-field"
          ref={ref}
          value={props.value}
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
  // here, we know the the value is not a special character &&
  // the user has allowed either alphanumeric input and value is alpha ||
  // the user only allows a numeric and value is numeric
  return true;
}

// to solve this, we should use useEffect.
// the effect callback should run when the pinNumber changes
// put the if statement in useeffect
// we'll create a custom hook that says useCompletedPinNumber
// and the callback is only ran when the pinnumber is "completed"

// type PinFieldAction =
//   | { type: "backspace" }
//   | { type: "paste" }
//   | { type: "character" };

// function pinFieldReducer(action: PinFieldAction) {
//   switch (action.type) {
//     case "backspace": {
//       return;
//     }
//     case "paste": {
//     }
//     case "character": {
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`);
//     }
//   }
// }

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

// -> we're going to watch for
// how to check initial render and all other re-renders
// avoid unnecessary re-renders
// signs for creating a custom hook
// anything else that we find interesting

// 2. updating our state: don't change the state if we don't have any updates to make
// so we don't trigger any unnecessary re-renders (backspaces and typing the same character in the same box)

// 3. execute onChange callback when state changes
// 5. focus error
// 6. error message
// --> screams control props - because we have to allow the user manage our state
// 7. error message to user if they don't specify pinFields

// if (result == pinNumber.length) {
//   onCompletedInput()
// }
// const newPinNumber = pinNumber
// setPinNumber()
/*import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  useContext,
  createContext,
} from "react";
import classNames from "classnames";
import "./styles/pinInput.scss";

export type PinType = "numeric" | "alphanumeric";
export type PinColor = "blue" | "green" | "purple";
export type PinErrorColor = "red" | "orange" | "yellow";

export interface PinProps {
  type: PinType;
  children?: React.ReactElement[];
  onChange?: (e: any) => void;
  onCompleted?: (e: any) => void;
}

// const PinContext = React.createContext("PinContext");

// function usePinContext() {
//   // use pin context to make sure that pin consumers are rendering with a pin parent
//   const context = React.useContext(PinContext);
//   if (context === undefined) {
//     throw new Error(
//       "PinFields must be rendered within the Pins. <PinField/> are children of a <Pin/> in a controlled compound component",
//     );
//   }
// }


// [ ] manage input based on user props
// [ ] focus management - if backspace, move cursor to back, if correct char move next
// [ ] copy paste 
// [ ] call onCompleted when pin is completed
// [ ] error if rendering a PinField outside of the parent

export const PinInput = (props: PinProps) => {
  const { type = "alphanumeric", children, onChange } = props;

  // we want custom, fine-grained control over how our input forms should work
  // we want to place focus on the next child
  const [pinNumber, setPinNumber] = useState(Array(children.length).fill(""));
  const [currentPin, setCurrentPin] = useState(0);
  const pinFields = useRef([]);

  // whenever the pin changes, we want to change some UI
  // and maybe call

  // closure over variables
  useCallback(() => {
    // every component re-render, focus on the first pin-input
    // we don't expect the user to refresh the page
    pinFields.current[currentPin].focus();
  }, [currentPin]);

  // useEffect() - side effects

  const updatePin = (value: string, childId: number) => {
    pinNumber[childId] = value;
    const newPinNumber = pinNumber.reduce((newPinNumber, current) => {
      if (current) return newPinNumber + current;
      return newPinNumber;
    }, "");

    // console.log(pinNumber);

    setPinNumber(pinNumber);

    const newCurrentPin =
      childId == children.length - 1 ? childId : childId + 1;
    setCurrentPin(newCurrentPin);
  };

  const clonedChildren = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      updatePin: updatePin,
      type,
      childId: index,
      ref: (ref: any) => (pinFields.current[index] = ref),
    });
  });

  return <div className="s-pin-input">{clonedChildren}</div>;
};

const BACKSPACE = 8;

export interface PinFieldProps {
  updatePin: (value: string, childId: number) => void;
  type: PinType;
  childId: number;
}
*/
/**
 * @desc PinField is an input element that accepts a single character
 * It is used its parent <PinInput/> to create a Pin number
 * We use forwardRef because if we passed a ref to PinField,
 * the parent component would have reference to the PinField and not the DOM node itself
 * Note: type parameters have the opposite ordering
 */
/*export const PinField = React.forwardRef<HTMLInputElement, PinFieldProps>(
  (props: PinFieldProps, ref: any) => {
    const { childId } = props;
    const [value, setValue] = useState("");

    // we want a state reducer pattern because we need to know
    // if the action change was a backspace
    // a copy paste
    // or a valid character

    const handlePinChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { value: initialValue } = e.currentTarget;
      const childId = e.currentTarget.getAttribute("child-id");
      const key = e.keyCode;
      let newInputValue = e.key;

      if (key == BACKSPACE) {
        newInputValue = "";
        setValue(newInputValue);
        props.updatePin(newInputValue, parseInt(childId));
      }

      if (isValidInput(props.type, newInputValue)) {
        setValue(newInputValue);
        props.updatePin(newInputValue, parseInt(childId));
      }
    };

    return (
      <div className="pin-input-field">
        <input
          value={value}
          onKeyDown={handlePinChange}
          className="s-pin-input-field"
          ref={ref}
          child-id={childId}
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
  // here, we know the the value is not a special character &&
  // the user has allowed either alphanumeric input and value is alpha ||
  // the user only allows a numeric and value is numeric
  return true;
}
*/
// to solve this, we should use useEffect.
// the effect callback should run when the pinNumber changes
// put the if statement in useeffect
// we'll create a custom hook that says useCompletedPinNumber
// and the callback is only ran when the pinnumber is "completed"

// type PinFieldAction =
//   | { type: "backspace" }
//   | { type: "paste" }
//   | { type: "character" };

// function pinFieldReducer(action: PinFieldAction) {
//   switch (action.type) {
//     case "backspace": {
//       return;
//     }
//     case "paste": {
//     }
//     case "character": {
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`);
//     }
//   }
// }

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
