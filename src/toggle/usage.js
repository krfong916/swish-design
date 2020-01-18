import React, {Component} from "react"
import Toggle from "./toggle"
import Switch from "./switch"

class Usage extends Component {
	handleKeyDownStateReducer = (state, changes) => {
		console.log("user-defined keydown", state)
		console.log("user-defined keydown", changes)
	}
	render() {
		return (
			<Toggle stateReducer={this.handleKeyDownStateReducer}>
				{({on, getToggleProps, toggle}) => (
					<div>
						<Switch
							{...getToggleProps({
								on: on,
								toggle,
								onKeyDown: event => {
									console.log("user specified fn")
								},
							})}
						/>
					</div>
				)}
			</Toggle>
		)
	}
}
export default Usage
