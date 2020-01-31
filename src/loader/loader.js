import React, {Component} from "react"
import "./loader.css"

class Loader extends Component {
  render() {
    return (
      <div className="loader-container">
        <div className="spinner-2">
          <span className="spinner-2-dot" />
          <span className="spinner-2-dot" />
          <span className="spinner-2-dot" />
          <span className="spinner-2-dot" />
        </div>
        <div className="spinner-1" />
      </div>
    )
  }
}

export default Loader
