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
    return ["margin", "padding", "color", "m", "p", "c", "sx"];
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
      div.setAttribute("style", newval);
    }
  }
}
export default MdBox;
