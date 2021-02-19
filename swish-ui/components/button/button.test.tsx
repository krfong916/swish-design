import * as React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./index";

afterEach(cleanup);

describe("Button", () => {
  test("Renders, yay!", () => {
    render(<Button />);
  });

  test("User is able to render children", () => {
    render(
      <Button>
        <span>Little Baby Test</span>
      </Button>,
    );
    const testChildRender = screen.getByRole("button", {
      name: /Little Baby Test/i,
    });
    expect(testChildRender).toBeDefined();
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

  test("Button can be used as a link", () => {
    render(
      <Button href="https://www.youtube.com/results?search_query=jr+swish" />,
    );
    expect(screen.getByRole("link")).toHaveAttribute("href");
  });

  test("Button responds to spacebar keypress event", () => {
    const keyDown = jest.fn();
    render(<Button onKeyDown={keyDown} />);
    const button = screen.getByRole("button");
    userEvent.type(button, "{space}");
    expect(keyDown).toHaveBeenCalledTimes(1);
  });

  test("User unable to interact with button when button is disabled", () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Button onClick={onClick} disabled={true} />);
    userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
