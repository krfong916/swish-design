import React, {Component} from "react"
import * as stateChangeTypes from "./stateChangeTypes"
import {callAll, hasStateChange} from "../utils"

class Toggle extends Component {
  static defaultProps = {
    stateReducer: (state, changes) => changes,
  }

  state = {on: false}

  internalSetState = recommendedState => {
    this.setState(currentState => {
      const reducedState = this.props.stateReducer(
        currentState,
        recommendedState,
      )
      const {type: ignoredType, ...stateToChange} = reducedState
      return hasStateChange(currentState, stateToChange) ? null : stateToChange
    })
  }

  toggle = (type = stateChangeTypes.toggle) => {
    const {on} = this.state
    this.internalSetState({on: !on, type})
  }

  handleKeyDown = event => {
    const key = getArrowKeys(event)
    if (this.keyDownHandlers[key]) {
      this.keyDownHandlers[key].call(this, event)
    }
  }

  keyDownHandlers = {
    ArrowLeft() {
      this.internalSetState({
        on: false,
        type: stateChangeTypes.keydownArrowLeft,
      })
    },
    ArrowRight() {
      this.internalSetState({
        on: true,
        type: stateChangeTypes.keydownArrowRight,
      })
    },
    " "(event) {
      event.preventDefault()
      this.internalSetState({
        on: !this.state.on,
        type: stateChangeTypes.keydownSpacebar,
      })
    },
  }

  getToggleProps = ({onKeyDown, ...rest} = {}) => {
    onKeyDown = callAll(onKeyDown, this.handleKeyDown)
    return {
      role: "switch",
      tabIndex: 0,
      onKeyDown: onKeyDown,
      "aria-checked": this.state.on,
      onKeyDown,
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

function getArrowKeys(event) {
  const {key} = event
  return key
}
