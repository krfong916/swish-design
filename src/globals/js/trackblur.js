import on from "./on";

import handles from './handles';

function trackBlur(ToMix) {
  class TrackBlur extends ToMix {
    constructor(element, options) {
      super(element, options);
      const hasFocusin = 'onfocusin' in window;
      const focusinEventName = hasFocusin ? 'focusin' : 'focus';
      this.manage(
        on(
          this.element.ownerDocument,
          focusinEventName,
          event => {
            if (!this.element.contains(event.target)) {
              this.handleBlur(event);
            }
          },
          !hasFocusin
        )
      );
    }
    handleBlur() {
      throw new Error(
        'Components inheriting TrackBlur mix-in must implement handleBlur() method.'
      );
    }
  }
  return TrackBlur;
}

const exports = [handles, trackBlur];
export default exports;
