import React, {Component} from "react"
import Toggle from "./toggle"
import Switch from "./switch"

class Usage extends Component {
	render() {
		return <Toggle>{({on, getToggleProps}) => <Switch></Switch>}</Toggle>
	}
}
export default Usage
