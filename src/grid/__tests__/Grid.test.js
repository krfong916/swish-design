import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Grid Component", function() {
  test("grid contents are left-aligned by default", function() {});

  describe("prop: justifyContent", () => {
    it("should apply the justify-content class", () => {
      const wrapper = shallow(<Grid justifyContent="space-evenly" container />);
      expect(
        wrapper.hasClass(classes["justify-content-xs-space-evenly"]),
      ).to.equal(true);
    });
  });

  test("grid contents can have different horizontal alignments", function() {});
  test("grid contents can be vertically aligned", function() {});
  test("the grid has default margins", function() {});
  test("the grid can have zero-margins", function() {});
  test("grid columns have gutters (spacing between columns)", function() {});
  test("grid columns resize when breakpoints are satisfied", function() {});
  test("spreads additional props to the element", function() {});
  test("when grid has been unmounted, componentWillUnmount should be called", function() {});
});
