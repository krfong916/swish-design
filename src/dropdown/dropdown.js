import {settings} from "../globals/misc/settings";
import mixin from "../globals/js/mixin";
import CreateComponent from "../globals/js/create-component";
import trackBlur from "../globals/js/trackblur";
import on from "../globals/js/on";

export default class Dropdown extends mixin(CreateComponent, trackBlur) {
  constructor(element, options) {
    super(element, options);
    console.log(this);
    this.manage(
      on(this.element, "keydown", event => {
        console.log(event);
      }),
    );
    this.manage(
      on(this.element, "click", event => {
        console.log(event);
      }),
    );
  }
  static components = new WeakMap();
}
