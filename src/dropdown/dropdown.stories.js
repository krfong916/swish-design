import {storiesOf} from "@storybook/html";
import {createElement} from "../globals/js/create-element";

storiesOf("dropdown", module).add("with dropdown", () => {
  let container = createDropdown();
  return container;
});

function createDropdown() {
  let container = createElement({
    type: "div",
    attributes: {
      class: "yi-dropdown-container",
    },
  });

  let title = createElement({
    type: "label",
    attributes: {
      class: "yi-dropdown-title",
      for: "yi-dropdown-id",
    },
    textContent: "Custom Dropdown",
  });

  title.textContent = "Custom Dropdown";

  let subtitle = createElement({
    type: "div",
    attributes: {
      class: "yi-dropdown-subtitle",
    },
  });

  subtitle.textContent = "custom subtitle";

  let dropdown = createElement({
    type: "ul",
    attributes: {
      class: "yi-dropdown",
      "data-value": "data-dropdown",
      id: "my-dropdown",
    },
  });

  let text = createElement({
    type: "li",
    attributes: {
      class: "yi-dropdown-text",
    },
  });

  text.textContent = "dropdown text";

  let arrow = createElement({
    type: "li",
    attributes: {class: "yi-dropdown-arrow-container"},
  });

  let list = createElement({
    type: "ul",
    attributes: {
      class: "yi-dropdown-list",
    },
  });

  for (let i = 0; i < 3; i++) {
    let list_item = createElement({
      type: "li",
      attributes: {class: "yi-dropdown-list-item"},
    });

    let link = createElement({
      type: "a",
      attributes: {
        class: "yi-dropdown-link",
      },
    });

    link.textContent = `Option ${i}`;

    list.appendChild(list_item);
    list_item.appendChild(link);
  }

  container.appendChild(title);
  container.appendChild(subtitle);
  container.appendChild(dropdown);
  dropdown.appendChild(text);
  dropdown.appendChild(arrow);
  dropdown.appendChild(list);

  return container;
}
