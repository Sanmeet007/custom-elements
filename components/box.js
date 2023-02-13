const template = document.createElement("template");
template.innerHTML = `
    <!-- Styles -->
    <style type="text/css">
     *{
        box-sizing :border-box;
        font-size:inherit;
        font-family :inherit
    }
    :host{
      display:block;
    }
    </style>

    <!-- Elements -->
    <div class="box">
        <slot></slot>
    </div>
`;
class MdBox extends HTMLElement {
  static get observedAttributes() {
    return ["margin", "padding", "color", "m", "p", "c", "sx", "display", "d", "gap", "g", "direction", "dir", "maxwidth", "minwidth", "w", "width", "height", "h", "radius", "r"];
  }

  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  attributeChangedCallback(attr, _, newval) {
    const div = this.shadowRoot.querySelector(".box");
    if (attr === "m" || attr === "margin") {
      div.style.margin = newval;
    } else if (attr === "p" || attr === "padding") {
      div.style.padding = newval;
    } else if (attr === "c" || attr === "color") {
      div.style.backgroundColor = newval;
    } else if (attr === "sx") {
      div.style.cssText += newval;
    } else if (attr === "display" || attr === "d") {
      div.style.display = newval;
    } else if (attr === "gap" || attr === "g") {
      div.style.gap = newval;
    } else if (attr === "direction" || attr === "dir") {
      div.style.flexDirection = newval;
    } else if (attr === "maxwidth") {
      div.style.maxWidth = newval;
    } else if (attr === "minwidth") {
      div.style.minWdith = newval;
    } else if (attr === "height" || attr === "h") {
      div.style.height = newval;
    } else if (attr === "width" || attr === "w") {
      div.style.width = newval;
    } else if (attr === "radius" || attr === "r") {
      div.style.borderRadius = newval;
    }
  }
}
export default MdBox;
