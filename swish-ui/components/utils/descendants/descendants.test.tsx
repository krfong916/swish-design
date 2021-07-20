/**
Hi! Welcome to Swish UI

In this file, we're testing the behavior of the descendants module

We recognize the setup for this test may obscure the test's intentions,

please be mindful that the top-level component is declaring Provider context, and consumers are subscribing to that context.
*/

import * as React from "react";
import { Button } from "../../button";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DescendantProvider,
  useDescendants,
  useDescendant,
  Descendant,
  createDescendantContext,
} from "./index";
import { createNamedContext } from "../createNamedContext";

// intersection type: combine descendant type with properties of an accordion descendant
type AccordionDescendant = Descendant & {
  focused?: boolean;
  disabled?: boolean;
};

const AccordionDescendantContext = createDescendantContext<AccordionDescendant>(
  "AccordionDescendantContext",
);

type AccordionItem = {
  prop?: boolean;
};
const initAccordionItem = {} as AccordionItem;
const AccordionItemContext = createNamedContext<AccordionItem>(
  "AccordionItemContext",
  initAccordionItem,
);

function Accordion({ children }: { children: React.ReactNode }) {
  const autoFocus: boolean = true;
  const [descendants, setDescendants] = useDescendants<AccordionDescendant>();

  return (
    <DescendantProvider
      setDescendants={setDescendants}
      context={AccordionDescendantContext}
      descendants={descendants}
    >
      <AccordionItemContext.Provider value={null}>
        {children}
      </AccordionItemContext.Provider>
    </DescendantProvider>
  );
}

function AccordionItem({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function AccordionButton({ children }: { children: React.ReactNode }) {
  return <button>{children}</button>;
}

function AccordionPanel({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

describe("Descendants Context API", () => {
  /** 
  This is all that we're testing

  focus on the first accordion item

  hit tab

  focus on the next accordion item
  */
  test("focuses on the next element", () => {
    const { container, getByText } = render(
      <Accordion>
        <AccordionItem>
          <h2>
            <AccordionButton>First section</AccordionButton>
          </h2>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>Second section</AccordionButton>
          </h2>
          <AccordionPanel>Panel 2</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    );
    const first = getByText("First section");
    const second = getByText("Second section");
    first.focus();
    expect(first).toHaveFocus();
    userEvent.tab();
    expect(second).toHaveFocus();
  });
});
