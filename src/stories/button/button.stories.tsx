import React from "react";
import Button from "../../components/button/button";
import "../../../global/global-style.css";
import "./button-stories.scss";
export default { title: "Button" };

export const Primary = () => (
  <div className="btn-container">
    <Button size="small" type="primary" className="app-presentation">
      <span>Small</span>
    </Button>
    <Button size="medium" type="primary" className="app-presentation">
      <span>Medium</span>
    </Button>
    <Button size="large" type="primary" className="app-presentation">
      <span>Large</span>
    </Button>
  </div>
);
