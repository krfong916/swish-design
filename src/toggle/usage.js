import React, {Component} from "react"
import Toggle from "./toggle"
import Switch from "./switch"

class Usage extends Component {
	render() {
		return (
			<Toggle>
				{({on, getToggleProps, toggle}) => (
					<div>
						<Switch
							{...getToggleProps({
								on: on,
								toggle,
							})}
						/>
					</div>
				)}
			</Toggle>
		)
	}
}
export default Usage
