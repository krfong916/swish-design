- position
  - center
  - top
  - bottom
- starting column
  - what happens if an element is already on that column space?
- gutter size

- Container
  - composed of 12 columns
- Row
  - it's width is 12 columns
- Element
  - placed on a row
  - the element's width can be one to 12 columns
  - what happens if we have overflow of elements? how can we resize the row, and expect good behavior from the surrounding container?

For example to set a column to be 1fr, but shrink no further than 200px: grid-template-columns: 1fr minmax(200px, 1fr);

In sass, lists are 1-indexed. Indexes start at 1, not 0. ...
