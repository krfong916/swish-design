/**
 TODO:
    -[ ] remove placeholder when there's a current focus
    -[ ] have to throw error if they don't specify managestyles with classes
    -[ ] have to throw error if they render a pin input outside of a
    -[ ] allow the clear prop - clear all values and focus on the first input
    -[ ] mask

    -[ ] is invalid state w/focus on all from props
    -[ ] default to disabled state
    -[ ] allow default value and partial values
    -[ ] allow copy paste
    
    -[x] standardize naming convention for styles
    -[x] styling
    -[x] size
    -[x] variant: "outline" | "unstyled" | "filled" | "flushed"
    -[x] separate hooks from styling etc. so ppl can have the functionality, and style however they like
    -[x] forwardRef
    -[x] previous tab/focus should not delete a character, only keep the highlight
 */
import * as React from "react";
import {
  usePinInput,
  usePinField,
  PinProps,
  PinContextProvider,
  PinContext,
  PinFieldProps,
  PinContextProviderProps,
} from "./usePinInput";
import classNames from "classnames";
import "./styles/pinInput.scss";

/**
 * PinInput is the top-level component for the Pin Component
 *
 * @param  PinProps User-specified properties to control the behavior and appearance
 * @return Pin      Swish Component
 */
export const PinInput = (props: PinProps) => {
  const { children, ...rest } = props;
  const context = usePinInput(rest);

  // combine contexts here, the user doesn't need to know of descendants
  // all they need to know is the provider
  return <PinContextProvider context={context}>{children}</PinContextProvider>;
};

/**
 * A child of the Pin component that accepts a single character
 * Collectively, the PinField is used to create a Pin code
 *
 * @return PinField Swish Component
 */
export const PinField = React.forwardRef<
  React.MutableRefObject<any | null>,
  PinFieldProps
>((props, userRef) => {
  const { manageStyle, classes } = props;

  const { pinClasses, ...pinFieldProps } = usePinField(props, userRef);

  const pinFieldStyles = manageStyle
    ? classNames([pinClasses, classes])
    : classNames("s-pin-base", "s-pin-field", [pinClasses]);

  return <input className={pinFieldStyles} {...pinFieldProps} />;
});
