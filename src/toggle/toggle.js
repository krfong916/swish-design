import React, {Component} from "react"
import * as stateChangeTypes from "./stateChangeTypes"

function callAll(...functions) {
	return function(...args) {
		functions.forEach(function(fn) {
			fn(...args)
		})
	}
}

function pluck(property, obj) {
	return Object.keys(obj).reduce((temp, key) => {
		if (key != property) temp[key] = obj[key]
		return temp
	}, {})
}

function shallowCompare(obj1, obj2) {
	return (
		Object.keys(obj1).length == Object.keys(obj2).length &&
		Object.keys(obj1).every(key => obj1[key] == obj2[key])
	)
}

class Toggle extends Component {
	static defaultProps = {
		stateReducer: (state, changes) => changes,
	}

	state = {on: false}

	// we want to suggest the changes to be made i.e. the state that is about to be set
	// and allow the user to decide if the state to be set is one they want made
	// we'll expose those changes to the user
	// calling the stateReducer
	// then we'll make our changes
	internalSetState = recommendedChanges => {
		this.setState(currentState => {
			// we pass the current state and the recommended changes
			// and we receive the changes the user would like
			const changes = this.props.stateReducer(currentState, recommendedChanges)
			// the user will pass either the currentState, the recommended changes, or an entirely new state back
			// we need to remove the type property from the changes object so that we don't merge it with the state
			// return an object without
			// pluck ('type')

			const reducedChanges = pluck("type", changes)
			// what to do if the reducedChanges is the same as the currentState? we don't want an unnecessary re-render
			// return reducedChanges || null
			return shallowCompare(changes, reducedChanges) ? null : reducedChanges
		})
	}

	toggle = () => {
		// we must define the current state
		// and the type of change that will occur
		// do we provide the current state
		// or do we provide the state change that should occur?
		const {on} = this.state
		this.internalSetState({on: !on, type: stateChangeTypes.toggleTest})
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
