const template = document.createElement("template");
template.innerHTML = `
    <!-- Styles -->
    <style type="text/css">
    
    </style>

    <!-- Elements -->
    <form>
        <slot />
    </form>
 
`;
class Form extends HTMLElement {
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
export default Form;
