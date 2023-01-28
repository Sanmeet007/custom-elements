const template = document.createElement("template");
template.innerHTML = `
    <!-- Styles -->
    <style type="text/css">
    :host{
        position : relative;
        display:block;
    }
    </style>

    <!-- Elements -->
    <div class="theme">
        <slot></slot>
    </div>
`;
class Theme extends HTMLElement {
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
  connectedCallback() {}
  attributeChangeCallback(attr, oldval, newval) {}
}
export default Theme;
