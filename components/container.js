const template = document.createElement("template");
template.innerHTML = `
    <!-- Styles -->
    <style type="text/css">
        :host{
            display: block;
            padding-inline: min(30px,5%);          
            margin: 0 auto;
            max-width: 1400px;
            width : 100%;
        }
    </style>

    <!-- Elements -->
    <div class="container">
        <slot></slot>
    </div>
`;

class Container extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default Container;
