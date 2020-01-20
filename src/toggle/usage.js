import React, {Component} from "react"
import Toggle from "./toggle"
import Switch from "./switch"

class Usage extends Component {
	// handleKeyDownStateReducer = (state, changes) => {
	// 	console.log("user-defined keydown", state)
	// 	console.log("user-defined keydown", changes)
	// }

	// handleKeyDownA = event => {
	// 	console.log("this.handleKeyDownA", event)
	// }
	// handleKeyDownB = event => {
	// 	console.log("this.handleKeyDownB", event)
	// }

	render() {
		return (
			<Toggle stateReducer={this.handleKeyDownStateReducer}>
				{({on, getToggleProps, toggle}) => (
					<div>
						<Switch
							{...getToggleProps({
								on: on,
								toggle,
								onKeyDown: event => {},
							})}
						/>
					</div>
				)}
			</Toggle>
		)
	}
}
export default Usage
