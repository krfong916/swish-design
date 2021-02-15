import React from "react";
import Button from "../../components/button/button";
import "../../../global/global-style.css";
import "./button-stories.scss";
export default { title: "Button" };

export const ButtonSizes = () => (
  <div className="btn-container">
    <Button size="small" color="primary" className="app-presentation">
      <span>Small</span>
    </Button>
    <Button color="primary" className="app-presentation">
      <span>Medium</span>
    </Button>
    <Button size="large" color="primary" className="app-presentation">
      <span>Large</span>
    </Button>
  </div>
);

export const ButtonColors = () => (
  <div className="btn-container">
    <Button color="default" className="app-presentation">
      <span>Default</span>
    </Button>
    <Button color="primary" className="app-presentation">
      <span>Primary</span>
    </Button>
    <Button color="secondary" className="app-presentation">
      <span>Secondary</span>
    </Button>
  </div>
);

export const ButtonVariations = () => (
  <div className="btn-container">
    <Button type="default" className="app-presentation">
      <span>Default</span>
    </Button>
    <Button type="outlined" className="app-presentation">
      <span>Primary</span>
    </Button>
    <Button type="disabled" className="app-presentation">
      <span>Secondary</span>
    </Button>
  </div>
);
