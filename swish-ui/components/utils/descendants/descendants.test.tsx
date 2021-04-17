import * as React from "react";
import { Button } from "../../button";
import { render, screen } from "@testing-library/react";
import {
  createDescendantContext,
  DescendantProvider,
  useDescendantsInit,
  useDescendant,
  Descendant,
} from "./index";

type ListDescendant = Descendant & {
  disabled?: boolean;
};

const listItemsContext = createDescendantContext<ListDescendant>(
  "listItemsContext",
);

function renderWithProviders(ui: React.ReactElement) {
  const Wrapper = ({ children }: { children?: React.ReactNode }) => {
    const [descendants, setDescendants] = useDescendantsInit<ListDescendant>();

    return (
      <DescendantProvider
        context={listItemsContext}
        setDescendants={setDescendants}
        descendants={descendants}
      >
        {children}
      </DescendantProvider>
    );
  };
  return render(ui, { wrapper: Wrapper });
}

const List: React.FC = () => {
  return (
    <ol>
      <ListItem />
      <div>
        <ListItem />
      </div>
      <ListItem />
    </ol>
  );
};

const ListItem: React.FC = () => {
  return (
    <li>
      <Button />
    </li>
  );
  // const buttonRef = React.useRef<HTMLButtonElement | null>(null)
  // useDescendant(buttonRef, listItemsContext)
  // return(<li><Button ref={buttonRef}/></li>)
};

describe("Descendants Context API", () => {
  test("context has a unique name", () => {
    renderWithProviders(<List />);
  });

  test("returns the index of the next descendant", () => {});

  test("gets the list of all descendants", () => {});

  test("removes descendant from the list", () => {});
});
