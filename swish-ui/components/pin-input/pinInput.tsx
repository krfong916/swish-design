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
  React.MutableRefObject<HTMLInputElement>,
  PinFieldProps
>((props, userRef) => {
  const { manageStyle, classes } = props;

  const { pinClasses, ...pinFieldProps } = usePinField(props, userRef);

  const pinFieldStyles = manageStyle
    ? classNames([pinClasses, classes])
    : classNames("s-pin-base", "s-pin-field", [pinClasses]);

  return <input className={pinFieldStyles} {...pinFieldProps} />;
});
