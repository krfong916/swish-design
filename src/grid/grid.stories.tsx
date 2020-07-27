import React from "react";
import { GridDemo } from "./grid-demo";
export default { title: "Grid" };

export const Grid: React.FC = () => <GridDemo />;

Grid.story = {
  name: "Responsive Grid Component",
};
