import React, {Component} from "react"
import * as stateChangeTypes from "./stateChangeTypes"

function callAll(...functions) {
	return function(...args) {
		functions.forEach(function(fn) {
			fn(...args)
		})
	}
}

class Toggle extends Component {
	static defaultProps = {
		stateReducer: (state, changes) => changes,
	}

	state = {on: false}

	internalSetState = (changes, cb) => {
		this.setState(state => {
			this.props.stateReducer(newStateToSet)

			return newStateToSet
		})
		// we want to suggest the changes to be made i.e. the state that is about to be set
		// and allow the user to decide if the state to be set is one they want made
		// we'll expose those changes to the user
		// calling the stateReducer
		// then we'll make our changes
	}

	toggle = () => {
		// we must define the current state
		// and the type of change that will occur

		this.setState(({on}) => {
			return {on: !on}
		})
		// internalSetState({currentState, type: stateChangeTypes.toggleTest}, cb)
	}

	getToggleProps = ({onKeyDown, ...rest} = {}) => {
		onKeyDown = callAll(onKeyDown, this.handleKeyDown)
		return {
			role: "switch",
			tabIndex: 0,
			onKeyDown: onKeyDown,
			"aria-checked": this.state.on,
			...rest,
		}
	}

	getStateAndHelpers = () => {
		return {
			on: this.state.on,
			getToggleProps: this.getToggleProps,
			toggle: this.toggle,
		}
	}

	render() {
		return this.props.children(this.getStateAndHelpers())
	}
}

export default Toggle

// need for onkeydown to happen
// keydown is for arrow keys
// we can use event.key and event.keycode
// ArrowLeft
// ArrowRight
// and space is ' '
// keypress is for all other keys

// I want the user to be able to apply their own event handlers
// without overriding the functionality of
// onkeydown
// onclick
