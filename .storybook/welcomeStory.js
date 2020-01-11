import {storiesOf} from "@storybook/html";

storiesOf("Welcome", module).add("Getting Started", () => {
  const h1 = document.createElement("h1");
  h1.innerText = "Welcome to 艺术";
  return h1;
});
