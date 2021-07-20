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
    <div className="pin-container-preset">
      <Pin>
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

export const PinWithCustomStyling = () => {
  return (
    <div className="pin-container-custom">
      <Pin inputType="text" manageStyle={true} placeholder="">
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

export const PinInputAvailablePresets = () => {
  return (
    <div>
      <div className="pin-container-preset">
        <Pin>
          <PinField />
          <PinField />
          <PinField />
          <PinField />
          <PinField />
          <PinField />
        </Pin>
      </div>

      <div className="pin-container-preset">
        <Pin variant="flushed">
          <PinField />
          <PinField />
          <PinField />
          <PinField />
          <PinField />
          <PinField />
        </Pin>
      </div>

      <div className="pin-container-preset">
        <Pin variant="filled">
          <PinField />
          <PinField />
          <PinField />
          <PinField />
          <PinField />
          <PinField />
        </Pin>
      </div>
      <div className="pin-container-preset">
        <Pin variant="unstyled">
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

export const PinInputWithControlProps = () => {
  const initialPin = "";
  const [pinCode, setPinCode] = React.useState(initialPin);
  const [isError, setIsError] = React.useState(false);

  const handleComplete = async (pin: string, clear: () => void) => {
    const isSuccess = await client(pin);
    setTimeout(() => {}, 1000);
    if (isSuccess) {
      console.log("Success!");
    } else {
      setPinCode(initialPin);
      setIsError(true);
      clear();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isError == true) {
      setIsError(false);
    }
  };

  return (
    <div>
      <div className="pin-container-preset" onKeyDown={handleKeyDown}>
        {isError ? <span>Verification Error</span> : null}
        <Pin
          onComplete={handleComplete}
          // onChange={onChange}
          defaultValue={initialPin}
          // value={pinCode}
          inputType="number"
          size="large"
        >
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

async function client(pin: string) {
  let test = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (pin == "123455") {
        resolve(true);
      } else {
        resolve(false);
      }
    }, 1000);
  });
  return await test;
}
