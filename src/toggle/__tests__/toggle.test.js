import React from "react"
import {render, fireEvent} from "@testing-library/react"
import * as stateChangeTypes from "../stateChangeTypes"
import "@testing-library/jest-dom/extend-expect"
import Toggle from "../toggle"

describe("Toggle component", function() {
	test("manages arrow right behavior", function() {
		const {usage, arrowRight} = renderToggle()
		arrowRight()
		expect(usage).toHaveBeenCalledWith(expect.objectContaining({on: true}))
	})

	test("manages arrow left behavior", function() {
		const {usage, arrowLeft, arrowRight} = renderToggle()
		// we call arrowRight in order invoke a state change
		// calling arrowLeft alone results in no state update
		// because toggle's initial state is set to false
		arrowRight()
		arrowLeft()
		expect(usage).toHaveBeenCalledWith(expect.objectContaining({on: false}))
	})

	test("spacebar toggles the switch", function() {
		const {usage, spacebar} = renderToggle()
		spacebar()
		expect(usage).toHaveBeenCalledWith(expect.objectContaining({on: true}))
	})

	test("keydown of unhandled buttons do nothing", function() {
		const keyButtons = [undefined, "a"]
		const {usage, button} = renderToggle()
		usage.mockClear()
		keyButtons.forEach(key => {
			fireEvent.keyDown(button, {key})
		})
		expect(usage).not.toHaveBeenCalled()
	})

	test("stateReducer allows the user to define ways to handle final state after keydown is handled", function() {
		const {usageComponent, toggle, on} = setup({
			stateReducer: (state, recommendedState) => {
				switch (recommendedState.type) {
					case stateChangeTypes.toggle:
						if (recommendedState == false) {
							return {...recommendedState, on: state.on}
						} else {
							return recommendedState
						}
					default:
						return state
				}
			},
		})

		usageComponent.mockClear()
		// based on the stateReducer condition above
		// recommendedState == false
		// we must toggle twice in order to see a state change
		// if we specified the condition recommendedState == true
		// then React would not have invoked a state change
		toggle()
		toggle()

		expect(usageComponent).toHaveBeenCalledWith(
			expect.objectContaining({
				on: true,
			}),
		)
	})
})

function renderToggle() {
	const usage = jest.fn(({getToggleProps, on, toggle}) => (
		<div onClick={toggle}>
			<button {...getToggleProps({"data-testid": "button"})} />
		</div>
	))

	const {queryByTestId} = render(<Toggle>{usage}</Toggle>)
	const button = queryByTestId("button")

	return {
		queryByTestId,
		usage,
		button,
		arrowLeft: () => fireEvent.keyDown(button, {key: "ArrowLeft"}),
		arrowRight: () => fireEvent.keyDown(button, {key: "ArrowRight"}),
		spacebar: () => fireEvent.keyDown(button, {key: " "}),
	}
}

/*
 * we are trying to test the state reducer functionality
 * a state reducer should allow a user to set a custom function - a "prop",
 * and execute that function when a state change type occurs
 * 
 * In this test, when the toggle method invokes a state change
 * we should call w/e functions the user has specified
 *
 * In order to do this, we need to render our Toggle component.
 * What is the toggle component? 
 * It's a wrapper with some state and helpers and receives functions/elements as a "child" property
 * 
 * when we call setup,
 * we use the Toggle component to wrap the arguments given (the functions/elements)
 * and return the wrapped component, along with any 
 
*/

function setup({render: renderFn = () => <div />, ...props} = {}) {
	let renderArg

	const usageComponent = jest.fn(function test(controllerArg) {
		renderArg = controllerArg
		return renderFn(controllerArg)
	})
	const queryUtils = render(<Toggle {...props}>{usageComponent}</Toggle>)
	return {usageComponent, ...queryUtils, ...renderArg}
}
