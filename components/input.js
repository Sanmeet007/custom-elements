const template = document.createElement("template");
template.innerHTML = `
    <!-- Styles -->
    <style type="text/css">
    
    </style>

    <!-- Elements -->
    <div></div>
`;
class Input extends HTMLElement {
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
  attributeChangedCallback(attr, oldval, newval) {}
}
export default Input;
