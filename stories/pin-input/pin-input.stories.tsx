import * as React from "react";
import "./pin-input.stories.scss";
import { PinInput as Pin, PinField } from "../../swish-ui";

export default {
  title: "Pin Input",
  component: Pin,
  parameters: {
    componentSubtitle: "Pin Input for entering form data",
  },
};

export const PinInput = () => {
  return (
    <div className="pin-container">
      <Pin type="numeric">
        <PinField />
        <PinField />
        <PinField />
        <PinField />
        <PinField />
        <PinField />
      </Pin>
    </div>
  );
};

// const errorStr =
//   "Woops! Your invite is invalid, go ahead and give it another go!";
// const PinInput = () => {
//   return (
//     // how to reveal error message props?
//     // allow focus style to be styled
//     // I think we should not have a prop for size
//     // instead we should have a context provider
//     // ok how to make that work? and fast
//     // allow copy paste
//     <PinInput
//       uppercase={true}
//       type="alphaNumeric"
//       private={false}
//       initialFocus={true}
//       size="md"
//       focusColor="blue"
//       errorBorderColor="red"
//     ></PinInput>
//   );
// };
// *
//  * uppercase: boolean
//  * type: alphanumeric, numeric, alpha
//  * private: boolean (dotted on you can see letters)
//  * initialFocus: boolean
//  * size: small medium large
//  * children: React.ChildComponents
//  * onChange:
//  * onComplete:
//  * color:
//  * errorBorderColor:
//  * value:
//  * defaultValue:
//  * we need to be able to move the focus on each pin - we can use a ref for that
//  * a ref will get us the DOM element that we need
//  * additionally, we'll have to pass props from a parent to a child node -> the pin input state to each pin
//  *
//  * must also work for tab
//  *
//  * what's the a11y for inputs?
