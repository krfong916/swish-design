import React, {Component} from "react"
import classNames from "classnames"
import "./switch.css"

class Switch extends Component {
  render() {
    let {
      on,
      toggle,
      role,
      "aria-checked": ariaChecked,
      onKeyDown,
      size,
      tabIndex,
    } = this.props
    let switchClassName = ["switch", on == true ? "-on" : "-off"].join("")
    let knobClassName = "knob"

    if (size == "small") {
      switchClassName += "__small"
      knobClassName += "__small"
    }

    return (
      <div className={switchClassName} onClick={toggle}>
        <button
          className={knobClassName}
          tabIndex={tabIndex}
          role={role}
          aria-checked={ariaChecked}
          onKeyDown={onKeyDown}
        ></button>
      </div>
    )
  }
}

export default Switch

// custom label
// support left and right, top bottom
// same place, left or right
