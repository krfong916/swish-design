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
    <div>
      <div className="pin-container-preset">
        <Pin inputType="numeric" size="large">
          <PinField />
          <PinField />
          <PinField />
          <PinField />
          <PinField />
          <PinField />
        </Pin>
      </div>
      <div className="pin-container-preset">
        <Pin inputType="numeric" size="large" variant="flushed">
          <PinField />
          <PinField />
          <PinField />
          <PinField />
          <PinField />
          <PinField />
        </Pin>
      </div>
      <div className="pin-container-preset">
        <Pin inputType="numeric" size="large" variant="filled">
          <PinField />
          <PinField />
          <PinField />
          <PinField />
          <PinField />
          <PinField />
        </Pin>
      </div>
      <div className="pin-container-preset">
        <Pin inputType="numeric" size="large" variant="unstyled">
          <PinField />
          <PinField />
          <PinField />
          <PinField />
          <PinField />
          <PinField />
        </Pin>
      </div>
    </div>
  );
};

export const PinWithCustomStyling = () => {
  return (
    <div className="pin-container-custom">
      <Pin inputType="numeric" manageStyle={true} placeholder="">
        <PinField manageStyle={true} classes={"s-pin-split"} />
        <PinField manageStyle={true} classes={"s-pin-split"} />
        <PinField manageStyle={true} classes={"s-pin-split"} />
        <div className="s-pin-split-divider">&bull;</div>
        <PinField manageStyle={true} classes={"s-pin-split"} />
        <PinField manageStyle={true} classes={"s-pin-split"} />
        <PinField manageStyle={true} classes={"s-pin-split"} />
      </Pin>
    </div>
  );
};
