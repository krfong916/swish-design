# Questions

- root
  - what are the root-level styles we need to apply in order for our styles to function as expected?
    - width is 100%?
- layout-grid
  - how to define breakpoints?
  - compute # of columns?
- columns
  - who defines the columns? The grid container itself or the row?
  - how can we align a cell to a column? How about flexbox
  - if the size of the cell exceeds the size of container
    - do we set overflow:scroll?
    - do resize the element in the cell itself?
    - suppose we have a single cell with a large width. What if the width extends the size of the columns of the container?
    - suppose we have cells that span 6 columns each, what happens to the cell sizes if we resize the screen and the number of columns is only 8 columns? or 4 columns?
- row
  - does the row specify columns, or does the container itself?
