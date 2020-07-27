import React from "react";

type GridProps = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  alignment?: string;
  children?: React.ReactNode;
};

export default class Grid extends React.Component<GridProps, {}> {
  render() {
    return (
      <div>
        <div style={{ display: "flex" }}>{this.props.children}</div>
      </div>
    );
  }
}

/*
order
flex-grow (span)
alignment
how to render children with flex children properties
how to do breakpoints
*/
