const template = document.createElement("template");
template.innerHTML = `
    <!-- Styles -->
    <style type="text/css">
        *{
            box-sizing :  border-box
         }
        :host{
            position:relative;
            z-index:2000;
            display: block;
        }
        
        .popover{
            z-index: 1;
            position : fixed;
            left:0;
            top:0;
            visibility :  hidden;
            opacity: 0;
            transform-origin: 0px 0px;
            transform-origin: top left;
            transform: scale(0.95);
            transition : opacity 211ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 141ms cubic-bezier(0.4, 0, 0.2, 1) 0ms  , visibility 211ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;   
          }
          
          .backdrop{
            position:fixed;
            z-index:100;
            inset:0;
            background-color: transparent;
            visibility :  hidden;
          }
          .backdrop-open{
            visibility :  visible;
          }
          
          .open{
            visibility :  visible;
            transform: scale(1);
            opacity: 1;
          }
          

          .paper {
            padding: 1rem;
            background-color: rgb(18, 18, 18);
            color: rgb(255, 255, 255);
            border-radius: 4px;
            box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px;
            background-image: linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12));
            overflow: hidden auto;
            min-width: 16px;
            min-height: 16px;
            max-width: calc(100% - 32px);
            max-height: calc(100% - 32px);
            outline: 0px;
            margin:0;
        }
          </style>
          
    <!-- Elements -->
      <div class="backdrop"></div>
      <div class="popover">
          <div class="paper">
            <slot></slot>
          </div>
      </div>
`;
class Popover extends HTMLElement {
  static get observedAttributes() {
    return ["open"];
  }

  get isopen() {
    return this.getAttribute("open");
  }
  set isopen(curr) {
    this.setAttribute("open", curr);
  }

  get top() {
    const popoverEl = this.shadowRoot.querySelector(".popover");
    return popoverEl.style.top;
  }
  set top(curr) {
    const popoverEl = this.shadowRoot.querySelector(".popover");
    popoverEl.style.top = curr;
  }

  get left() {
    const popoverEl = this.shadowRoot.querySelector(".popover");
    return popoverEl.style.left;
  }
  set left(curr) {
    const popoverEl = this.shadowRoot.querySelector(".popover");
    popoverEl.style.left = curr;
  }

  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    const popoverEl = this.shadowRoot.querySelector(".popover");
    const backdropEl = this.shadowRoot.querySelector(".backdrop");
    backdropEl.addEventListener("click", (e) => {
      this.isopen = false;
    });
  }
  attributeChangedCallback(attr, oldval, newval) {
    const popoverEl = this.shadowRoot.querySelector(".popover");
    const backdropEl = this.shadowRoot.querySelector(".backdrop");

    switch (attr) {
      case "open":
        if (this.isopen === "true" || this.isopen === "") {
          backdropEl.classList.add("backdrop-open");
          popoverEl.classList.add("open");
        } else {
          backdropEl.classList.remove("backdrop-open");
          popoverEl.classList.remove("open");
        }
        break;

      default:
        //   Silence is golden
        break;
    }
  }
}
export default Popover;
