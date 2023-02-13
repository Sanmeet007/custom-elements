const template = document.createElement("template");
template.innerHTML = `
    <!-- Styles -->

    <style type="text/css">
      *{
        box-sizing : border-box;
        font-family: inherit;
      }
      .modal-container{
        position:  fixed;
        inset: 0;
        z-index:100;
        isolation: isolate;
        display:  flex;
        align-items: center;
        justify-content :  center;
        font-size: inherit;
        visibility : hidden;
      }
      .modal{
        max-width: 600px;
        padding : 3px;
        background-color : black;
        margin-inline: 20px;
        margin-block: auto;
        box-shadow: 1px 1px 4px rgba(0,0,0,0.5);
        z-index: 2;
        transition : opacity 0.1s ease-in , visibility 0.1s ease;;
        opacity :0;
        visibility: hidden;
      }
      .modal-visible{
        visibility: visible;
        opacity : 1;
      }
      .backdrop{
        position : absolute;
        inset: 0;
        background-color : rgba(0,0,0,0.5);
        z-index: 1;
        visibility: hidden;
        opacity: 0;
        transition : opacity 0.3s ease  , visibility 0.3s ease;
      }
      .backdrop-visible{
        visibility: visible;
        opacity : 1;
      }
      .paper{
        background-color : #121212;
        color: white;
        padding : 10px;
      }
    </style>

    <!-- Elements -->
    <div class="modal-container">
      <div class="backdrop"></div>
      <div class="modal">
      <div class="paper">
        <slot></slot>
      </div>
      </div>
    </div>
`;

class Modal extends HTMLElement {
  static get observedAttributes() {
    return ["open"];
  }

  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.isopened = false;
  }

  connectedCallback() {
    window.addEventListener("keyup", (e) => {
      if (e.key === "Escape" && this.isopened) {
        this.close();
      }
    })
    const backdrop = this.shadowRoot.querySelector(".backdrop");
    backdrop.addEventListener("click", () => {
      this.close();
    });
  }

  open() {
    this.setAttribute("open", true);
  }

  close() {
    this.setAttribute("open", false);
  }

  attributeChangedCallback(attr, oldval, newval) {
    const backdrop = this.shadowRoot.querySelector(".backdrop");
    const modal = this.shadowRoot.querySelector(".modal");
    switch (attr) {
      case "open":
        if (newval === "true" || newval === "") {
          this.isopened = true;
          if (!backdrop.classList.contains("backdrop-visible")) {
            backdrop.classList.add("backdrop-visible");
          }
          if (!modal.classList.contains("modal-visible")) {
            modal.classList.add("modal-visible");
          }
        } else {
          this.isopened = false;
          if (backdrop.classList.contains("backdrop-visible")) {
            backdrop.classList.remove("backdrop-visible");
          }
          if (modal.classList.contains("modal-visible")) {
            modal.classList.remove("modal-visible");
          }
        }
        break;

      default:
        break;
    }
  }
}

export default Modal;
