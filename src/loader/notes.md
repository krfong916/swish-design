## Loader notes

## ARIA

What makes a loader accessible for screen readers and across browsers?

### Aria-Live Regions

- content that updates without a page reload is either a region or widget. Content changes that are not interactive are known as live regions
- ARIA-live regions provide a way to expose content changes to the page that can be announced to users of assistive technologies.
- `aria-live` sets how a screen reader should handle updates to live regions: `off`, `polite`, and `assertive` are the settings
- regions are identified just like an `id` or `div`.

- `progressbar` role should be used to for an element that displays the progress status of a task that takes a long time or has several steps. The progressbar role indicates a user's request has been received and is making progress toward completing the requested action.

## Loader state for button

- in a button, focus gets disabled when pressed to prevent multiple submissions
- how do we update attributes/add content to the DOM? This will be important for alerting loading states of an element
- How can we know a consumer makes a button go into a loading state? Will it fire on page load?

## Sources

- https://github.com/Shopify/polaris-react/issues/1212
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
- https://accessabilly.com/an-accessible-microinteractions-button/
- https://codepen.io/dpersing/pen/f88e7ca65884f37c64353b27b02c3224
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_progressbar_role
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_progressbar_role
- https://stackoverflow.com/questions/31716425/how-do-you-make-the-loading-icon-accessible-for-screen-readers-like-jaws
