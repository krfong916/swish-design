import React, {Component} from "react"
import classNames from "classnames"
import "./button.css"

class Button extends Component {
  // props: {
  //   onclick
  //   buttonType
  //   iconWithPosition
  //   size
  //   loading
  //   ghost
  // }
  //

  // state = {
  //   isloading
  // }

  // getButtonProps
  // returns aria attributes

  // button type
  // disabled
  // danger
  // primary
  // dashed
  // secondary
  // ghost
  // only icon
  // with icon
  // icon placement:
  //   - before
  //   - after
  // button size:
  //   - small
  //   - medium
  //   - large

  render() {
    return (
      <div className="swish-btn-container">
        <button className="swish-btn swish-btn--primary">
          <span>Primary</span>
        </button>
        <button className="swish-btn">
          <span>Secondary</span>
        </button>
        <button className="swish-btn swish-btn--dashed">
          <span>Dashed</span>
        </button>
        <button className="swish-btn swish-btn--danger">
          <span>Danger</span>
        </button>
        <button className="swish-btn swish-btn--warning">
          <span>Warning</span>
        </button>
        <button className="swish-btn swish-btn--disabled">
          <span>Disabled</span>
        </button>
        <button className="swish-btn swish-btn--link">
          <span>Link</span>
        </button>
        <button className="swish-btn swish-btn--iconLeft">
          <span></span>
        </button>
        <button className="swish-btn swish-btn--iconRight">
          <span></span>
        </button>
      </div>
    )
  }
}

export default Button
