import {configure} from "@storybook/html";
const req = require.context("../src/dropdown", true, /\.stories\.js$/);
import Dropdown from "../src/dropdown/dropdown";

document.addEventListener("DOMContentLoaded", () => {
  var instance = Dropdown.create(document.getElementById('my-dropdown'));
});


function loadStories() {
  require("./welcomeStory");
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
