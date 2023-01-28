const template = document.createElement("template");
template.innerHTML = `
    <!-- Styles -->
    <style type="text/css">
    *{
      box-sizing :border-box;
    }
    :host{
      --text-clr: black;
      --mode-clr :black;
      --span-opacity:0.2;
      display: inline-block;
      color: inherit;
      user-select: none;
    }
    div::after{
      content : "";
      position: absolute;
      inset: 0;
      opacity: 0;
      pointer-events:none;
      background-color : var(--mode-clr);
      transition: all 200ms ease;
    }
    div:hover::after{
      opacity:0.1;
    }
    div > *{
      pointer-events:none;
    }
    div{
      isolation :isolate;
      cursor:pointer;
      position: relative;
      display:inline-flex;
      align-items:center;
      justify-content:center;
      height: 2.5rem;
      width : 2.5rem;
      font-size: inherit;
      overflow:hidden;
      border-radius: 50%;
      color: inherit;
    }
    slot{
      pointer-events :none;
    }
    span{
      position : absolute;
      background : var(--mode-clr);
      border-radius : 50%;
      transform : translate(-50% , -50%);
      pointer-events : none;
      z-index :1;
      width : 10px;
      height : 10px;
      animation : ripple 0.3s linear infinite;
    }
    @keyframes ripple{
      0%{
          transform : translate(-50% , -50%)  scale(1);
          opacity : var(--span-opacity);
      }
      100%{
          transform : translate(-50% , -50%)  scale(10);
          opacity : 0;
      }
  }    
    @media screen and (max-width : 500px){
      div{
          cursor:auto;
      }
  }
  
    </style>

    <!-- Elements -->
    <div>
      <slot></slot>
    </div>
`;

class IconButton extends HTMLElement {
  static get observedAttributes() {
    return ["size"];
  }

  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  isOnce() {
    return this.rippleTimes;
  }
  connectedCallback() {
    const d = this.shadowRoot;
    const iconBtnEl = d.querySelector("div");

    iconBtnEl.addEventListener("click", (e) => {
      const x = e.offsetX + "px";
      const y = e.offsetY + "px";

      const spanEl = document.createElement("span");

      if (iconBtnEl.querySelectorAll("span").length <= 3) {
        iconBtnEl.appendChild(spanEl);
        spanEl.style.left = x;
        spanEl.style.top = y;

        setTimeout(() => {
          spanEl.remove();
        }, 300);
      }
    });
  }
  attributeChangeCallback(attr, oldval, newval) {
    const iconBtnEl = this.shadowRoot.querySelector("div");
    switch (attr) {
      case "size":
        iconBtnEl.style.height = newval;
        iconBtnEl.style.width = newval;
        break;

      default:
      // slience is golden
    }
  }
}
export default IconButton;
