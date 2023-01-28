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
    <div>
        <slot></slot>
    </div>
`;
class MdBox extends HTMLElement {
  static get observedAttributes() {
    return ["no"];
  }

  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
export default MdBox;
