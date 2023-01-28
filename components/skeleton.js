const template = document.createElement("template");
template.innerHTML = `
    <!-- Styles -->
    <style type="text/css">
      *{
        box-sizing: border-box;
      }
      :host{
        --bg : 0,0,0;
        display: block;
      }
      .wave::after {
        content: "";
          animation: 1.6s linear 0.5s infinite normal none running wave-animation;
          background: linear-gradient(90deg , transparent, rgba(var(--bg), 0.08), transparent);
          position: absolute;
          transform: translateX(-100%);
          inset: 0;
          display: block;
          z-index:1;
      }
      .wave{
        display: block;
        background-color: rgba(var(--bg), 0.13);
        overflow: hidden;
      }
      
      .opacity{
        animation : opacity-animation 1.5s ease-in-out 0.5s infinite normal none running;
      }

      .none{
        display: block;
      }

      .skeleton{
        --height: 2rem;
        --width: 100%;
        display: block;
        position: relative;
        min-height: 1.2rem;
        width: var(--width);
        height: var(--height);
        background-color : rgba(var(--bg) , 0.13);
        overflow: hidden;
      }
      
      @keyframes opacity-animation{
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.4;
        }
        100% {
            opacity: 1;
        }
      }

      @keyframes wave-animation {
        0% {
            -webkit-transform: translateX(-100%);
            -moz-transform: translateX(-100%);
            -ms-transform: translateX(-100%);
            transform: translateX(-100%);
        }

        50% {
            -webkit-transform: translateX(100%);
            -moz-transform: translateX(100%);
            -ms-transform: translateX(100%);
            transform: translateX(100%);
        }

        100% {
            -webkit-transform: translateX(100%);
            -moz-transform: translateX(100%);
            -ms-transform: translateX(100%);
            transform: translateX(100%);
        }
    }
    </style>

    <!-- Elements -->
    <div class="skeleton"></div>
`;
class Skeleton extends HTMLElement {
  static get observedAttributes() {
    return ["variant", "animation", "width", "height", "inherit"];
  }

  set height(newheight) {
    this.shadowRoot
      .querySelector(".skeleton")
      .style.setProperty("--height", newheight);
  }
  get height() {
    return this.shadowRoot
      .querySelector(".skeleton")
      .style.getPropertyValue("--height");
  }
  set width(newwidth) {
    this.shadowRoot
      .querySelector(".skeleton")
      .style.setProperty("--width", newwidth || "100%");
  }
  get width() {
    return this.shadowRoot
      .querySelector(".skeleton")
      .style.getPropertyValue("--width");
  }

  set animation(name) {
    this.setAttribute("animation", name);
  }

  get animation() {
    return this.getAttribute("animation");
  }

  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {}
  removeAnimationClasses() {
    const skeletonEl = this.shadowRoot.querySelector(".skeleton");
    skeletonEl.classList.remove("wave");
    skeletonEl.classList.remove("none");
    skeletonEl.classList.remove("opacity");
  }
  attributeChangedCallback(attr, oldval, newval) {
    const skeletonEl = this.shadowRoot.querySelector(".skeleton");

    switch (attr) {
      case "variant":
        switch (newval) {
          case "circle":
            skeletonEl.style.borderRadius = "50%";
            skeletonEl.style.setProperty("--width", "35px");
            skeletonEl.style.setProperty("--height", "35px");
            skeletonEl.style.flexShrink = "0";
            break;
          case "rectangle":
            skeletonEl.style.setProperty("--height", "7rem");
            break;
          case "text":
            skeletonEl.style.borderRadius = "4px";
            skeletonEl.style.setProperty("--height", "1.2rem");
            break;

          default:
            skeletonEl.style.setProperty("--height", "7rem");
            break;
        }
        break;
      case "width":
        this.width = newval;
        break;
      case "height":
        this.height = newval;
        // conso;
        break;
      case "animation":
        switch (newval) {
          case "wave":
            this.removeAnimationClasses();
            skeletonEl.classList.add("wave");
            break;

          case "opacity":
            this.removeAnimationClasses();
            skeletonEl.classList.add("opacity");
            break;

          case "none":
            this.removeAnimationClasses();
            skeletonEl.classList.add("none");
            break;

          default:
            this.removeAnimationClasses();
            skeletonEl.classList.add("opacity");
            break;
        }
        break;
      case "inherit":
        try {
          const variant = this.parentElement.getAttribute("variant");
          switch (variant) {
            case "h1":
              this.height = "7.2rem";
              break;
            case "h2":
              this.height = "5rem";
              break;
            case "h3":
              this.height = "3.5rem";
              break;
            case "h4":
              this.height = "2.5rem";
              break;
            case "h5":
              this.height = "2.2rem";
              break;
            case "h6":
              this.height = "2rem";
              break;

            default:
              this.height = "1.2rem";
              break;
          }
        } catch (e) {
          console.error(e);
        }
        break;
      default:
        // Silence is golden
        break;
    }
  }
}
export default Skeleton;
