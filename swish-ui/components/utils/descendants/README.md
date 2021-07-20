## What

(This document was written under the haste of time, so I take responsibility for thoughts that are not clearly expressed)

Want: Flexibility.

Example 1: Using `React.children.map` combined with `React.useRef`, and `React.forwardRef` this works for focus management

```jsx
<Pin onChange={onChange}>
  <PinField />
  <PinField />
  <PinField />
</Pin>
```

However, the usage of our component is brittle to future changes. For example: what if we needed to wrap one of the PinFields in a separate div? Or, place a div as a spacer in between PinFields? That would break our implementation for placing focus on the correct tag

Example 2:

```jsx
<Pin>
  <PinField />
  <div>
    <PinField />
  </div>
</Pin>
```

What we need: ability to assigning refs to our DOM elements of our choosing. We can't assume that our components will always be direct children to their parent components (as in our first example).

Here's our solution: the descendants module.

## Why

We could very well have used a Provider Pattern to implement the Descendants functionality. (We did)

The benefits

- an explicitly named context for consumers
  - we'd have to pass the context object around
- a known pattern for future developers to make future decisions off of

Taking a close look at what we need from the Provider Pattern, we need

- to maintain a state object
- subscribe and unsubscribe functions
- a getter
  Explained another way, at the heart of our development needs, all we need is a pub/sub singleton with a getter method.

## Alternative

From the perspective of classic design patterns (pub/sub), a Provider is not _strictly_ necessary to implement our functionality. Here is my point: given that _both_ top-level component parents and children are defined in the same file (co-located)

- For example:

  - Pin Input and pin fields
  - Accordion and accordion items
  - Tab and tab items

- we don't need to pass a context object because elements we have control over their definitions

As justification for this statement: I claim that using custom hooks is the correct level of abstraction for our needs.

Hooks lasts throughout the lifecycle of our component, the top-level component still maintains the state object, we can define subscribe and unsubscribe functions in custom hooks.
As for the getter, let's address how it will be used. We can provide the list of descendants (our state) when we declare the descendants object. The calling component will have complete control. It can simply use the descendants array to the list of dependencies for the side-effects that occur.

## Sources

- [Reach UI](https://github.com/reach/reach-ui/blob/1449650359c119c1afe25973aa7584e09e2c88bc/packages/descendants/src/index.tsx#L224)
- [Chakra UI](https://github.com/chakra-ui/chakra-ui/blob/d1a21ed1a4ec37ca9aee44f2db347ca44f092578/packages/descendant/src/use-descendant.ts#L69)

## Notes

- forceUpdate():
  - We force update because we don't have reference to the real DOM on the process of first render.
    When useDescendant is invoked, the React engine hasn't rendered the actual DOM elements,
    so we have to force update because - the reconciler will be able to diff what's change in the tree (which is nothing) and in that process we'll invoke useDescendants again, and that second time around, we'll have the ref.
