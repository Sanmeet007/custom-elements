import Button from "./components/button.js";
import IconButton from "./components/icon-button.js";
import Box from "./components/box.js";
import Modal from "./components/modal.js";
import Divider from "./components/divider.js";
import Skeleton from "./components/skeleton.js";
import Typography from "./components/typography.js";
import Popover from "./components/popover.js";
import Icon from "./components/icon.js";
import Container from "./components/container.js";
import TextField from "./components/textfield.js";
import "./components/index.js";

const PREFIX = "md";

const targetElms = document.querySelectorAll("[target]");
const closeTargetElms = document.querySelectorAll("[close-target]");

targetElms.forEach((el) => {
  if (el.tagName.toUpperCase() !== "A") {
    const targetQuery = el.getAttribute("target");
    try {
      const targetEl = document.querySelector(targetQuery);

      if ((PREFIX + "-popover").toUpperCase() === targetEl.tagName) {
        window.addEventListener("resize", (e) => {
          const rectBounding = el.getBoundingClientRect();
          targetEl.left = rectBounding.left + "px";
          targetEl.top = rectBounding.top + "px";
        });
        el.addEventListener("mouseover", (e) => {
          const rectBounding = el.getBoundingClientRect();
          targetEl.left = rectBounding.left + "px";
          targetEl.top = rectBounding.bottom + "px";
        });
      }
      el.addEventListener("click", (e) => {
        if (targetEl === null || targetEl === undefined)
          throw new Error("Element not found!");
        if (
          targetEl.getAttribute("open") === "" ||
          targetEl.getAttribute("open") === "true"
        ) {
          targetEl.setAttribute("open", false);
        } else {
          targetEl.setAttribute("open", true);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
});

closeTargetElms.forEach((el) => {
  if (el.tagName.toUpperCase() !== "A") {
    const targetQuery = el.getAttribute("close-target");
    try {
      const targetEl = document.querySelector(targetQuery);
      el.addEventListener("click", (e) => {
        if (targetEl === null || targetEl === undefined)
          throw new Error("Element not found!");
        else {
          targetEl.setAttribute("open", false);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
});

customElements.define(PREFIX + "-icon", Icon);
customElements.define(PREFIX + "-button", Button);
customElements.define(PREFIX + "-icon-button", IconButton);
customElements.define(PREFIX + "-box", Box);
customElements.define(PREFIX + "-modal", Modal);
customElements.define(PREFIX + "-popover", Popover);
customElements.define(PREFIX + "-divider", Divider);
customElements.define(PREFIX + "-skeleton", Skeleton);
customElements.define(PREFIX + "-typography", Typography);
customElements.define(PREFIX + "-container", Container);
customElements.define(PREFIX + "-textfield", TextField);
