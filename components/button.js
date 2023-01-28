const template = document.createElement("template");
template.innerHTML = `
    <!-- Styles -->
    <style type="text/css">
        *{
          box-sizing : border-box;
          font-family:inherit;
          font-size: inherit;
        }
        
        :host{
          --span-bg: black;
          --span-opacity:0.2;
          --accent-clr: inherit;
          --text-clr :white;
            display: inline-block;
          }

          button{
            margin:0;
            padding:0;
            box-sizing : border-box;
            -webkit-box-align: center;
            align-items: center;
            display:inline-flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-tap-highlight-color: transparent;
            isolation :isolate;
            box-sizing: border-box;
            outline: 0px;
            border: 0px;
            margin: 0px;
            cursor: pointer;
            user-select: none;
            vertical-align: middle;
            appearance: none;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.875rem;
            letter-spacing: 0.02857em;
            text-transform: uppercase;
            min-width: 64px;
            min-height: 2rem;
            padding: 12px 15px;
            border-radius: 3px;
            position: relative;
            background-color: var(--accent-clr);
            color:var(--text-clr);
            overflow:hidden;
            border: 1px solid transparent;
        }
        button:not(:disabled):hover::after{
          content: "";
           pointer-events:none; 
           position:absolute;
           z-index:-1;
           inset:0;
           background-color: var(--span-bg);
           opacity: 0.1
        }
       span, slot{
           pointer-events : none;
       }
           span{
            position: absolute;
            background : var(--span-bg);
            border-radius : 50%;
            transform : translate(-50% , -50%);
            width : 10px;
            height : 10px;
            inset:0;
            animation : ripple 1.2s linear infinite;
        }

        button:disabled,
        button[disabled="true"]{
            cursor : auto;
            background-color: #cccccc;
            color: #999;
            background : rgba(0, 0, 0, 0.12);
            box-shadow : none;
        }
      

        .contained{
          --span-bg :  black;
          --span-opacity: 0.1;
          color :var(--text-clr);
          background-color : var(--accent-clr);
          box-shadow : 1px 1.5px 4px rgba(0,0,0,0.3);
        }

        .outlined{
          --span-bg: var(--accent-clr);
          border-color:  var(--accent-clr);
          background-color :transparent;
          color : var(--accent-clr);
        }
        .text{
          --span-bg :var(--accent-clr);
          background-color: transparent;
          color : var(--accent-clr);
          box-shadow: none !important;
        }

        .outlined-disabled{
          background: transparent!important;
          border-color: currentColor !important;
        }
        .text-disabled{
          background: transparent!important;
        }
        .contained-disabled{

        }

        @keyframes ripple{
            0%{
                transform : translate(-50% , -50%)  scale(1);
                opacity : var(--span-opacity);
              }
              100%{
                transform : translate(-50% , -50%)  scale(80);
                opacity : 0;
            }
        }
        @media screen and (max-width : 500px){
            button{
                cursor:auto;
            }
        }
    </style>

    <!-- Elements -->
    <button>
        <slot></slot>      
    </button>
`;

class Button extends HTMLElement {
  static get observedAttributes() {
    return ["variant", "wave", "elevation", "color", "disabled"];
  }
  get variant() {
    return this.getAttribute("variant");
  }
  get elevation() {
    return this.getAttribute("elevation");
  }
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const d = this.shadowRoot;
    const btnEl = d.querySelector("button");
    btnEl.addEventListener("click", (e) => {
      const x = e.offsetX + "px";
      const y = e.offsetY + "px";

      if (
        (this.variant === "contained" && this.elevation === "true") ||
        (this.variant === "contained" && this.elevation === "") ||
        (this.variant === "contained" && this.elevation === null)
      ) {
        btnEl.style.boxShadow = "1px 1.5px 4px rgba(0,0,0,0.5)";
        setTimeout(() => {
          btnEl.style.boxShadow = "1px 1.5px 4px rgba(0,0,0,0.3)";
        }, 350);
      }
      const spanEl = document.createElement("span");

      if (btnEl.querySelectorAll("span").length <= 3) {
        btnEl.appendChild(spanEl);
        spanEl.style.left = x;
        spanEl.style.top = y;

        setTimeout(() => {
          spanEl.remove();
        }, 1200);
      }
    });
  }

  attributeChangedCallback(attr, oldval, newval) {
    const btnEl = this.shadowRoot.querySelector("button");
    let isdisabled = false;
    if (this.getAttribute("disabled") === "true") {
      isdisabled = true;
    } else if (this.getAttribute("disabled")) {
      isdisabled = true;
    } else if (this.getAttribute("disabled") === "") {
      isdisabled = true;
    }

    switch (attr) {
      case "disabled":
        if (newval === "true" || newval === "") {
          btnEl.setAttribute("disabled", true);
        } else {
          btnEl.removeAttribute("disabled");
        }
        break;

      case "elevation":
        if (newval === "true" || newval == "") {
          btnEl.style.boxShadow = "2px 2px 6px rgba(0,0,0,0.4)";
        } else {
          btnEl.style.boxShadow = "none !important";
        }
        break;

      case "variant":
        switch (newval) {
          case "outlined":
            if (!isdisabled) {
              btnEl.classList = null;
              btnEl.classList = ["outlined"];
            } else {
              btnEl.classList = null;
              btnEl.classList = ["outlined-disabled"];
            }

            break;

          case "text":
            if (!isdisabled) {
              btnEl.classList = null;
              btnEl.classList = ["text"];
            } else {
              btnEl.classList = null;
              btnEl.classList = ["text-disabled"];
            }
            break;

          case "contained":
            if (!isdisabled) {
              btnEl.classList = null;
              btnEl.classList = ["contained"];
            } else {
              btnEl.classList = null;
              btnEl.classList = ["contained-disabled"];
            }
            break;
        }
        break;

      default:
        if (!isdisabled) {
          btnEl.classList = null;
          btnEl.classList = ["contained"];
        } else {
          btnEl.classList = null;
          btnEl.classList = ["contained-disabled"];
        }
      // silence is golden
    }
  }
}
export default Button;
