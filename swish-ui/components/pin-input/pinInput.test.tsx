import * as React from "react";
import { PinInput, PinField } from "./pinInput";
import { render, screen } from "@testing-library/react";
describe("pin input", () => {
  test("User is able to render children", () => {
    render(
      <PinInput type="alphanumeric">
        <PinField />
        <PinField />
      </PinInput>,
    );
  });

  test("Has aria attributes", () => {});

  test("We can restrict input types", () => {});

  test("Typing a character goes to the next cell", () => {});

  test("We can backspace to the next cell", () => {});

  test("Completing the entire form calls the callback", () => {});
});
