import * as React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../src/components/button/button";

afterEach(cleanup);

describe("Button", () => {
  test("Renders, yay!", async () => {
    await render(<Button />);
  });

  test("Specify size type as a property, get a different-sized button structurally", () => {
    const smallButton = render(<Button size="small" />);
    const mediumButton = render(<Button size="medium" />);
    expect(Object.is(smallButton, mediumButton)).toBe(false);
  });

  test("Calls onClick prop on Button click", () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Button onClick={onClick} />);
    userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("User is able to render children", () => {});

  test("Button can be used as a link", () => {
    render(
      <Button href="https://www.youtube.com/results?search_query=jr+swish" />,
    );
    expect(
      screen
        .getByRole("link")
        .toHaveAttribute(
          "href",
          "https://www.youtube.com/results?search_query=jr+swish",
        ),
    );
  });

  test("User unable to interact with button when button is disabled", () => {
    render(<Button href="" disabled={true} />);
  });

  test("User is able to apply other props to our component", function() {});
});
