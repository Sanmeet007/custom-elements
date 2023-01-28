const template = document.createElement("template");
template.innerHTML = `

    <!-- Material Icons -->
    <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">

    <!-- Styles -->
    <style type="text/css">
       :host{
         display : inline-flex;
         align-items: center;
         margin : 0!important;
         padding : 0!important;
         height: 15px;
         color: inherit;
         overflow: hidden;
       }
        span{
            display : inline-flex;
            align-items: center;
            font-size: inherit;
            margin:0 !important;
        }

        .md-18 { font-size: 18px; }
        .md-24 { font-size: 24px; }
        .md-36 { font-size: 36px; }
        .md-48 { font-size: 48px; }

        /* Rules for using icons as black on a light background. */
        .md-dark { color: rgba(0, 0, 0, 0.54); }
        .md-dark.md-inactive { color: rgba(0, 0, 0, 0.26); }

        /* Rules for using icons as white on a dark background. */
        .md-light { color: rgba(255, 255, 255, 1); }
        .md-light .md-inactive { color: rgba(255, 255, 255, 0.3); }
    </style>

    <!-- Elements -->
   
    <span class="material-icons">
        <slot></slot>
    </span>

`;
class Icon extends HTMLElement {
  static get observedAttributes() {
    return ["modifiers", "variant"];
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
  connectedCallback() {}
  attributeChangedCallback(attr, oldval, newval) {
    const spanEl = this.shadowRoot.querySelector("span");
    switch (attr) {
      case "modifiers":
        const oArr = oldval.split(" ") || [];
        const nArr = newval.split(" ") || [];
        if (oldval === null) oldval = "";
        if (newval === null) newval = "";
        oArr.forEach((m) => {
          spanEl.classList.remove(m);
        });
        nArr.forEach((m) => {
          spanEl.classList.add(m);
        });

        break;

      case "variant":
        switch (newval) {
          case "outlined":
            spanEl.classList.remove("material-icons");
            spanEl.classList.remove("material-icons-outlined");
            spanEl.classList.remove("material-icons-round");
            spanEl.classList.remove("material-icons-sharp");
            spanEl.classList.remove("material-icons-two-tone");

            spanEl.classList.add("material-icons-outlined");
            break;

          case "filled":
            spanEl.classList.remove("material-icons");
            spanEl.classList.remove("material-icons-outlined");
            spanEl.classList.remove("material-icons-round");
            spanEl.classList.remove("material-icons-sharp");
            spanEl.classList.remove("material-icons-two-tone");

            spanEl.classList.add("material-icons");
            break;

          case "round":
            spanEl.classList.remove("material-icons");
            spanEl.classList.remove("material-icons-outlined");
            spanEl.classList.remove("material-icons-round");
            spanEl.classList.remove("material-icons-sharp");
            spanEl.classList.remove("material-icons-two-tone");

            spanEl.classList.add("material-icons-round");
            break;

          case "sharp":
            spanEl.classList.remove("material-icons");
            spanEl.classList.remove("material-icons-outlined");
            spanEl.classList.remove("material-icons-round");
            spanEl.classList.remove("material-icons-sharp");
            spanEl.classList.remove("material-icons-two-tone");

            spanEl.classList.add("material-icons-sharp");
            break;

          case "two-tone":
            spanEl.classList.remove("material-icons");
            spanEl.classList.remove("material-icons-outlined");
            spanEl.classList.remove("material-icons-round");
            spanEl.classList.remove("material-icons-sharp");
            spanEl.classList.remove("material-icons-two-tone");

            spanEl.classList.add("material-icons-two-tone");
            break;

          default:
            spanEl.classList.remove("material-icons");
            spanEl.classList.remove("material-icons-outlined");
            spanEl.classList.remove("material-icons-round");
            spanEl.classList.remove("material-icons-sharp");
            spanEl.classList.remove("material-icons-two-tone");

            spanEl.classList.add("material-icons");
            break;
        }
        break;
      default:
        break;
    }
  }
}
export default Icon;
