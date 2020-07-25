import * as React from "react";
import "./swish-grid.scss";
import "./demo.css";
export const LayoutDemo: React.SFC = () => (
  <div>
    <div className="sdc-grid">
      <div className="sdc-grid-inner">
        <div className="sdc-grid-col sdc-grid-col--span-4">1</div>
        <div className="sdc-grid-col">2</div>
        <div className="sdc-grid-col">3</div>
        <div className="sdc-grid-col">
          <span>
            4 ok so then what happens when this is a really huge box, do we
            overflow?
          </span>
        </div>
        <div className="sdc-grid-col">
          <h1>
            let's see how far we can take this and if the max-width wil overlfow
            what will happen idk idkjfhfldjgdfjgbdfsjgbdfsjlgbdfskjg
            dfkjgnfdsjkgneakjgheraihjerai;oheraio;haerg
            ergeraiovnergnegiernag;eklrf wafbweiobfweof weoif weoib
          </h1>
        </div>
        <div className="sdc-grid-col">6</div>
        <div className="sdc-grid-col">7</div>
        <div className="sdc-grid-col">8</div>
        <div className="sdc-grid-col">9</div>
        <div className="sdc-grid-col">10</div>
        <div className="sdc-grid-col">11</div>
        <div className="sdc-grid-col">12</div>
      </div>
    </div>
    <div className="sdc-grid">
      <div className="sdc-grid-inner">
        <div className="sdc-grid-col">Span 4 columns, yeah, 4 cols.</div>
        <div className="sdc-grid-col">
          <div className="sdc-grid">
            <div className="sdc-grid-inner">
              <div className="sdc-grid-col">nested</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// <div className="sdc-grid sdc-grid">
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
