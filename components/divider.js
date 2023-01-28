const template = document.createElement("template");
template.innerHTML = `
    <!-- Styles -->
    <style type="text/css">
    host{
      display: block
    }
    .divider{
        width : 100%;
        height : 1px;
        border-radius:  2px;
        background-color:  #333;
        margin-block: 1rem;
    }
    </style>

    <!-- Elements -->
    <div class="divider"></div>
`;
class Divider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
export default Divider;
