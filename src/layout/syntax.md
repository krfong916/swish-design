What do I use to have control over namespaces i.e. create locally scoped variables, and get expected behavior - instead of global stylesheet?

### mixin

a function to call that applies some styles to your class.
We can add mixins defined in other parts of our file to our current context using `@include`

### @use

primary replacement for `@import`

- makes variables declared in one file accessible in the current stylesheet
- locally-scoped as opposed to `@import`. Variables are no longer globally scoped if we use `@use`
- the default namespace is the url, we can also alias the namespace using `as`
- we can also use `*` to include everything in the namespace, this is useful if the file has multiple modules

* `@each`
* `map.keys()`
* `@include`
* `dot`properties
* `@for $variable from 1 through map.get()`
* `@forward`
* `&`
  - used when nesting. Time-saver for parent selector or creating modifier classes

```css
  .layout-cell {
    &--align-top {

    }
  }
  /*the equivalent*/
  .laout-cell--align-top
```

- difference between variables and variables import folder
