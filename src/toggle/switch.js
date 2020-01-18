import React, {Component} from "react"

class Switch extends Component {
	render() {
		console.log("this.props", this.props)
		let {
			on,
			role,
			toggle,
			onKeyDown,
			tabIndex,
			"aria-checked": ariaChecked,
		} = this.props

		return (
			<div>
				<button
					tabIndex
					role={role}
					aria-checked={ariaChecked}
					onClick={toggle}
					onKeyDown={onKeyDown}
				>{`${on}`}</button>
			</div>
		)
	}
}

export default Switch

// import classNames from "classnames"
// import "./switch.css"
// const switchClassName = classNames({
// 	// default toggle style
// 	// toggle-on
// 	// toggle-off
// 	// any additional className passed as a property
// })
