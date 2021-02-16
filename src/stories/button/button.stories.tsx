import React from "react";
import Button from "../../components/button/button";
import "../../../global/global-style.css";
import "./button-stories.scss";
export default { title: "Button" };

export const Sizes = () => (
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
    <Button size="large" color="primary" href="#" className="app-presentation">
      <span>Link</span>
    </Button>
  </div>
);

export const Contained = () => (
  <div className="btn-container">
    <Button type="contained" color="default" className="app-presentation">
      <span>Default</span>
    </Button>
    <Button type="contained" color="primary" className="app-presentation">
      <span>Primary</span>
    </Button>
    <Button type="contained" color="secondary" className="app-presentation">
      <span>Secondary</span>
    </Button>
    <Button type="contained" disabled={true} className="app-presentation">
      <span>Disabled</span>
    </Button>
    <Button
      type="contained"
      color="primary"
      href="#"
      className="app-presentation"
    >
      <span>Link</span>
    </Button>
  </div>
);

export const Outlined = () => (
  <div className="btn-container">
    <Button type="outlined" color="default" className="app-presentation">
      <span>Default</span>
    </Button>
    <Button type="outlined" color="primary" className="app-presentation">
      <span>Primary</span>
    </Button>
    <Button type="outlined" color="secondary" className="app-presentation">
      <span>Secondary</span>
    </Button>
    <Button
      type="outlined"
      color="primary"
      disabled={true}
      className="app-presentation"
    >
      <span>Disabled</span>
    </Button>
    <Button
      type="outlined"
      color="primary"
      href="#"
      className="app-presentation"
    >
      <span>Link</span>
    </Button>
  </div>
);

export const Text = () => (
  <div className="btn-container">
    <Button type="text" color="default" className="app-presentation">
      <span>Default</span>
    </Button>
    <Button type="text" color="primary" className="app-presentation">
      <span>Primary</span>
    </Button>
    <Button type="text" color="secondary" className="app-presentation">
      <span>Secondary</span>
    </Button>
    <Button type="text" disabled={true} className="app-presentation">
      <span>Disabled</span>
    </Button>
    <Button
      type="text"
      color="primary"
      href="https://www.youtube.com/results?search_query=jr+swish"
      className="app-presentation"
    >
      <span>Link</span>
    </Button>
  </div>
);
