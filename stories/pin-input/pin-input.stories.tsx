const errorStr =
  "Woops! Your invite is invalid, go ahead and give it another go!";
const PinInput = () => {
  return (
    // how to reveal error message props?
    // allow focus style to be styled
    // I think we should not have a prop for size
    // instead we should have a context provider
    // ok how to make that work? and fast
    // allow copy paste
    <PinInputGroup
      uppercase={true}
      type="alphaNumeric"
      private={false}
      initialFocus={true}
      size="md"
      size={6}
    >
      <Message type="error" message={errorStr} />
    </PinInputGroup>
  );
};
/**
 * uppercase: boolean
 * type: alphanumeric, numeric, alpha
 * private: boolean (dotted on you can see letters)
 * initialFocus: boolean
 * size: small medium large
 * children: React.ChildComponents
 * onChange:
 * onComplete:
 * color:
 * errorBorderColor:
 * value:
 * defaultValue:
 */
