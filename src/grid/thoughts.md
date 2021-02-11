We define a 12 column layout as default

- do we have a maximum column span for a column given a certain breakpoint?
  - I think we should and we should also give a warning

What are the components?

- a row
  - the grid itself, the container that holds columns
  - display flex assigned to it
  - has a default margin associated with it there should be an option to remove it, because of nested grid use case
- a column
  - defines columns and the spacing between columns
  - defines left and right padding between columns
  - we do not support shrink, grow. The user will use a stylesheet for that

How do we implement the notion of `xs, sm, md, lg, xl`? In what way are these sizes related to the spacing and number of columns?
I assume t-shirt size is about breakpoints and the number of colums that are allowed

- then what's spacing for `[1,2,3,4,5,6,7,8,9,10,11]`
- spacing is to specify how large the gutters should be
-
