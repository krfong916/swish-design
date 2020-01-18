import React, {Component} from "react"
import * as stateChangeTypes from "./stateChangeTypes"

class Toggle extends Component {
	static defaultProps = {
		stateReducer: (state, changes) => changes,
	}

	state = {on: false}

	internalSetState = () => {
		// we want to suggest the changes to be made
		// and allow the user to decide if the type of change to be performed
		// is one they want made
		// we'll make our changes
		// and the any changes the user wants to make
		//
	}

	toggle = cb => {
		this.internalSetState()
	}

	getToggleProps = ({onKeyDown, ...rest} = {}) => {
		return {
			role: "switch",
			tabIndex: 0,
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
