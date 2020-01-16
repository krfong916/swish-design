import React from "react"
import {render, fireEvent} from "@testing-library/react"
import Toggle from "./toggle"

describe("Toggle component", function() {
	let toggle
	beforeEach(() => {
		toggle = render(<Toggle />)
	})

	it("works", function() {
		expect(toggle).toBeDefined()
	})

	it("is called with default state", function() {
		expect(toggle.state().on).toBe(true)
	})

	//
	// it changes state when clicked
	// expect state to be off
	//
	// it focuses
	// it blurs
	//
	// it changes state according to left arrow key press
	// expect state to be on
	//
	// it changes state according to right arrow key press
	// expect state to be off
	//
	// it changes state according to spacebar key press
	// expect state to be toggled
	//
	// it can be called with a disabled state of on or off
	// expect toggle to be unclickable with a specified default state
	//
	//
})
