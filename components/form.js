const template = document.createElement("template");
template.innerHTML = `
    <!-- Styles -->
    <style type="text/css">

    </style>

    <!-- Elements -->
    <form>
        <slot></slot>
    </form>

`;
class Icon extends HTMLElement {
    static get observedAttributes() {
        return [];
    }
    get modifiers() {
        return this.getAttribute("modifiers");
    }

    constructor() {
        super();
        this.attachShadow({
            mode: "open",
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback() { }
    attributeChangedCallback(attr, oldval, newval) {

    }
}
export default Icon;
