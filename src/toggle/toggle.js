import React, {Component} from "react"
import * as stateChangeTypes from "./stateChangeTypes"

class Toggle extends Component {
	state = {on: true}

	toggle = () => {
		this.setState(({on}) => ({on: !on}))
	}

	getToggleProps = () => {
		return {
			role: "switch",
			"aria-checked": this.state.on,
		}
	}

	getStateAndHelpers = () => {
		return {on: this.state.on, getToggleProps: this.getToggleProps}
	}

	render() {
		return this.props.children(this.getStateAndHelpers())
	}
}

export default Toggle
