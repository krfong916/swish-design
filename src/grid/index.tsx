import React from "react";

type GridProps = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  alignment?: string;
  children?: React.ReactNode;
  display?: string;
};

export default class Grid extends React.Component<GridProps, {}> {
  render() {
    return (
      <div>
        <div style={{}}>{this.props.children}</div>
      </div>
    );
  }
}

// why specify a number for sizes? xs, sm, md, etc.
// specifies the number of columns?

// allow grid and flexbox?

/*
order
flex-grow (span)
alignment
how to render children with flex children properties
how to do breakpoints
*/
