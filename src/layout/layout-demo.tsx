import * as React from "react";
import "./swish-grid.scss";
import "./demo.css";
export const LayoutDemo: React.SFC = () => (
  <div>
    <div className="swish-grid demo-flex-grid">
      <div className="demo-flex-row">1</div>
      <div className="demo-flex-row">2</div>
      <div className="demo-flex-row">3</div>
      <div className="demo-flex-row">4</div>
      <div className="demo-flex-row">5</div>
      <div className="demo-flex-row">6</div>
      <div className="demo-flex-row">7</div>
      <div className="demo-flex-row">8</div>
      <div className="demo-flex-row">9</div>
      <div className="demo-flex-row">10</div>
      <div className="demo-flex-row">11</div>
      <div className="demo-flex-row">12</div>
    </div>
    <div className="demo-grid">
      <div className="demo-grid-row" id="span-4">
        Span 4 columns, yeah, 4 cols.
      </div>
      <div className="demo-grid-row" id="placement-8">
        Placed on 8
      </div>
    </div>
  </div>
);

// <div className="sdc-grid demo-grid">
//   <div className="sdc-grid-cell sdc-grid-cell--span-6 demo-grid-cell" />
//   <div className="sdc-grid-cell sdc-grid-cell--span-2 demo-grid-cell" />
//   <div className="sdc-grid-cell sdc-grid-cell--span-5 demo-grid-cell" />
// </div>
// <div className="sdc-grid demo-grid">
//   <div className="sdc-grid-cell sdc-grid-cell--align-top demo-grid-cell" />
//   <div className="sdc-grid-cell sdc-grid-cell--align-middle demo-grid-cell" />
//   <div className="sdc-grid-cell sdc-grid-cell--align-bottom demo-grid-cell" />
// </div>
// <div className="sdc-grid sdc-grid--align-right demo-grid">
//   <div className="sdc-grid-cell demo-grid-cell" />
//   <div className="sdc-grid-cell demo-grid-cell" />
// </div>
// <div className="sdc-grid demo-grid">
//   <div className="sdc-grid-cell--width-30" />
//   <div className="sdc-grid-cell--width-20" />
//   <div className="sdc-grid-cell--width-120" />
// </div>
