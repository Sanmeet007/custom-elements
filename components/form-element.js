const template = document.createElement("template");
template.innerHTML = `
    <!-- Styles -->
    <style type="text/css">
    
    </style>

    <!-- Elements -->
    <div>
        <slot></slot>
    </div>
`;
class FormElement extends HTMLElement {
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
export default FormElement;
