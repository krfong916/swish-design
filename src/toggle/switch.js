import React, {Component} from "react"
import "./switch.css"
class Switch extends Component {
	render() {
		let {
			on,
			role,
			toggle,
			onKeyDown,
			tabIndex,
			"aria-checked": ariaChecked,
		} = this.props
		let knob = "knob"
		let holder = on ? "holder__checked" : "holder"
		let holderBackground = on
			? "holder-background__checked"
			: "holder-background"

		return (
			<div className={holder} onClick={toggle}>
				<div className={holderBackground} />
				<button
					className={knob}
					tabIndex
					role={role}
					aria-checked={ariaChecked}
					onKeyDown={onKeyDown}
				></button>
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
