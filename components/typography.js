const template = document.createElement("template");
template.innerHTML = `
    <!-- Styles -->
    <style type="text/css">
      *{
        box-sizing : border-box;
        font-family : inherit;
      }
      :host{
        height: auto;
        display: block;
        color:inherit;
      }
      h1{
        color: inherit;
        margin: 0px 0px 0.35em;
        font-weight: 300;
        font-size: 6rem;
        line-height: 1.167;
        letter-spacing: -0.01562em;
      }
      h2{
        color:inherit;

        margin: 0px 0px 0.35em;
        font-weight: 300;
        font-size: 3.75rem;
        line-height: 1.2;
        letter-spacing: -0.00833em;
      }
      h3{
        color:inherit;
        margin: 0px 0px 0.35em;
        font-weight: 400;
        font-size: 3rem;
        line-height: 1.167;
        letter-spacing: 0em;
      }
      h4{
        color:inherit;
        margin: 0px 0px 0.35em;
        font-weight: 400;
        font-size: 2.125rem;
        line-height: 1.235;
        letter-spacing: 0.00735em;
      }
      h5{
        color:inherit;
        margin: 0px 0px 0.35em;
        font-weight: 400;
        font-size: 1.5rem;
        line-height: 1.334;
        letter-spacing: 0em;
      }
      h6{
        color:inherit;
        margin: 0px 0px 0.35em;
        font-weight: 500;
        font-size: 1.25rem;
        line-height: 1.6;
        letter-spacing: 0.0075em;
      }

      .subtitle1{
        margin: 0px 0px 0.35em;
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.75;
        letter-spacing: 0.00938em;
      }
      .subtitle2{
        margin: 0px 0px 0.35em;
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.57;
        letter-spacing: 0.00714em;
      }
      .body1{
        margin: 0px 0px 0.35em;
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.5;
        letter-spacing: 0.00938em;
      }
      .body2{
        margin: 0px 0px 0.35em;
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        letter-spacing: 0.01071em;
      }
      .button-text{
        margin: 0px 0px 0.35em;
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.75;
        letter-spacing: 0.02857em;
        text-transform: uppercase;
        display: block;
      }
      .caption-text{
        margin: 0px 0px 0.35em;
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.66;
        letter-spacing: 0.03333em;
        display: block;
      }
      .overline-text{
        margin: 0px 0px 0.35em;
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 2.66;
        letter-spacing: 0.08333em;
        display: block;
      }
    </style>

    <!-- Elements -->
    <div class="typography">
      <p><slot></slot></p>
    </div>

`;
class Typography extends HTMLElement {
  static get observedAttributes() {
    return ["variant"];
  }

  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() { }
  attributeChangedCallback(attr, _, newval) {
    const typographyEl = this.shadowRoot.querySelector(".typography");
    switch (attr) {
      case "variant":
        switch (newval) {
          case "h1":
            typographyEl.innerHTML = `
            <h1>
              <slot></slot>
            </h1>
            `;
            break;

          case "h2":
            typographyEl.innerHTML = ` 
            <h2>
              <slot></slot>
            </h2>
            `;
            break;

          case "h3":
            typographyEl.innerHTML = ` 
            <h3>
              <slot></slot>
            </h3>
            `;
            break;

          case "h4":
            typographyEl.innerHTML = ` 
            <h4>
              <slot></slot>
            </h4>
            `;
            break;

          case "h5":
            typographyEl.innerHTML = ` 
            <h5>
              <slot></slot>
            </h5>
            `;
            break;

          case "h6":
            typographyEl.innerHTML = ` 
            <h6>
              <slot></slot>
            </h6>
            `;
            break;

          case "p":
            typographyEl.innerHTML = ` 
            <p>
              <slot></slot>
            </p>
            `;
            break;

          case "subtitle1":
            typographyEl.innerHTML = `<div class="subtitle1">
              <slot />
            </div>`;
            break;

          case "subtitle2":
            typographyEl.innerHTML = `<div class="subtitle2">
                <slot />
              </div>`;
            break;

          case "body1":
            typographyEl.innerHTML = `<div class="body1">
              <slot />
            </div>`;
            break;

          case "body2":
            typographyEl.innerHTML = `<div class="body2">
                <slot />
              </div>`;
            break;

          case "span":
            typographyEl.innerHTML = `<span>
                  <slot />
                </span>`;
            break;
          case "button-text":
            typographyEl.innerHTML = `<div class="button-text">
                  <slot />
                </div>`;
            break;
          case "caption-text":
            typographyEl.innerHTML = `<div class="caption-text">
                  <slot />
                </div>`;
            break;
          case "overline-text":
            typographyEl.innerHTML = `<div class="overline-text">
                  <slot />
                </div>`;
            break;
          default:
            typographyEl.innerHTML = `<p>
                    <slot />
                  </p>`;
            break;
        }
        break;

      default:
        break;
    }
  }
}
export default Typography;
