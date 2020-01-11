/**
 * createElement - creates a DOM element with attributes
 *
 * @param  {Object} element a pojo
 * @return {DOMNode}        dom element with attributes
 */
export function createElement(element) {
  if (typeof element !== "object") {
    throw new TypeError("args must be an object");
  }

  if (!element.hasOwnProperty("type")) {
    throw new TypeError("must specify an element");
  }

  let domElement;
  domElement = document.createElement(element.type);

  // create attributes
  if (element.hasOwnProperty("attributes")) {
    let {attributes} = element;
    let attributeKeys = Object.keys(attributes);
    attributeKeys.forEach(key => {
      domElement.setAttribute(key, attributes[key]);
    });
  }

  return domElement;
}
