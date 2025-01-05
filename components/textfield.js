const template = document.createElement("template");
template.innerHTML = `
    <!-- Styles -->
    <style>
        :host {
            display: block;
        }

        .form-element {
            isolation: isolate;
            z-index: 0;
            display: inline-flex;
            flex-direction: column;
            position: relative;
            min-width: 0px;
            padding: 0px;
            margin: 0px;
            border: 0px;
            vertical-align: top;
        }

        label {
            color: var(--label-color, rgba(255, 255, 255, 0.7));
            font-family: Roboto, Helvetica, Arial, sans-serif;
            font-weight: 400;
            font-size: 1rem;
            line-height: 1.4375em;
            letter-spacing: 0.00938em;
            padding: 0px;
            display: block;
            transform-origin: left top;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: calc(100% - 24px);
            position: absolute;
            left: 0px;
            top: 0px;
            transform: translate(14px, 16px) scale(1);
            transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
            z-index: 1;
            pointer-events: none;
        }

        .element {
            font-family: Roboto, Helvetica, Arial, sans-serif;
            font-weight: 400;
            font-size: 1rem;
            line-height: 1.4375em;
            letter-spacing: 0.00938em;
            color: rgb(255, 255, 255);
            box-sizing: border-box;
            cursor: text;
            display: inline-flex;
            align-items: center;
            position: relative;
            border-radius: 4px;
        }

        input,
        textarea {
            outline: none;
            font: inherit;
            letter-spacing: inherit;
            color: var(--text-color, currentcolor);
            border: 0px;
            box-sizing: content-box;
            background: none;
            margin: 0px;
            -webkit-tap-highlight-color: transparent;
            display: block;
            width: 100%;
            padding: 16.5px 14px;
        }

        textarea {
            resize: none;
        }

        fieldset {
            text-align: left;
            position: absolute;
            inset: -5px 0px 0px;
            margin: 0px;
            padding: 0px 8px;
            pointer-events: none;
            border-radius: inherit;
            border-style: solid;
            border-width: 1px;
            overflow: hidden;
            min-width: 0%;
            border-color: var(--border-color, rgba(255, 255, 255, 0.23));
        }

        legend {
            float: unset;
            display: block;
            width: auto;
            padding: 0px;
            height: 11px;
            font-size: 0.75em;
            visibility: hidden;
            max-width: 0.01px;
            transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;
            white-space: nowrap;
        }

        legend > span {
            padding-left: 5px;
            padding-right: 5px;
            display: inline-block;
        }

        .label-focused {
            color: var(--label-focus-color, var(--label-color, rgba(255, 255, 255, 0.7)));
            transform: translate(14px, -9px) scale(0.75);
        }

        .legend-focused {
            max-width: 100%;
            transition: max-width 100ms cubic-bezier(0, 0, 0.2, 1) 50ms;
        }

        .fieldset-focused {
            border-color: var(--accent-clr);
        }

        .form-element:focus-within > label {
            color: var(--accent-clr);
        }

        .form-element.fullwidth {
            width: 100%;
        }
        
        .required-asterisk{
            color: var(--required-color,red);
        }
    </style>

    <!-- Elements -->
    <div class="form-element">
        <label data-shrink="false" for="outlined-basic" id="outlined-basic-label">Outlined</label>
        <div class="element">
            <input aria-invalid="false" id="outlined-basic" type="text" value="">
            <fieldset aria-hidden="true">
                <legend><span>Outlined</span></legend>
            </fieldset>
        </div>
    </div>
`;

class TextField extends HTMLElement {
  #changeEvent = new CustomEvent("change");

  static get observedAttributes() {
    return [
      "name",
      "label",
      "type",
      "autocomplete",
      "maxlength",
      "max",
      "min",
      "step",
      "fullwidth",
      "multiline",
      "rows",
      "cols",
    ];
  }

  get value() {
    return this._value;
  }

  set value(v) {
    const input =
      this.shadowRoot.querySelector("input") ||
      this.shadowRoot.querySelector("textarea");
    const label = this.shadowRoot.querySelector("label");
    const legend = this.shadowRoot.querySelector("legend");
    if (v === "") {
      label.classList.remove("label-focused");
      legend.classList.remove("legend-focused");
    } else {
      label.classList.add("label-focused");
      legend.classList.add("legend-focused");
    }

    input.value = v;
    this._value = v;
  }

  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._value = "";
  }

  reset() {
    this.value = "";
    this.dispatchEvent(this.#changeEvent);
  }

  connectedCallback() {
    const input =
      this.shadowRoot.querySelector("input") ||
      this.shadowRoot.querySelector("textarea");
    const label = this.shadowRoot.querySelector("label");
    const legend = this.shadowRoot.querySelector("legend");
    const fieldset = this.shadowRoot.querySelector("fieldset");

    input.addEventListener("focusin", () => {
      label.classList.add("label-focused");
      legend.classList.add("legend-focused");
      fieldset.classList.add("fieldset-focused");
    });
    input.addEventListener("focusout", () => {
      if (input.value === "") {
        label.classList.remove("label-focused");
        legend.classList.remove("legend-focused");
      }
      fieldset.classList.remove("fieldset-focused");
    });
    input.addEventListener("input", (e) => {
      this._value = e.target.value;
      this.dispatchEvent(this.#changeEvent);
    });

    const initialValue = this.getAttribute("initial");
    if (initialValue) {
      label.classList.add("label-focused");
      legend.classList.add("legend-focused");
      this.value = initialValue;
    }

    if (this.hasAttribute("required")) {
      input.setAttribute("required", "true");
      label.innerHTML = `${label.textContent} <span class="required-asterisk">*</span>`;
      legend.textContent = `${legend.textContent} ***`;
    }
  }

  attributeChangedCallback(attr, _, newval) {
    const div = this.shadowRoot.querySelector(".form-element");
    const input =
      this.shadowRoot.querySelector("input") ||
      this.shadowRoot.querySelector("textarea");
    const label = this.shadowRoot.querySelector("label");
    const legend = this.shadowRoot.querySelector("legend");

    if (attr === "multiline") {
      const textarea = document.createElement("textarea");
      textarea.setAttribute("rows", this.getAttribute("rows") || 3);
      textarea.setAttribute("cols", this.getAttribute("cols") || 20);
      textarea.value = this._value;
      div.querySelector(".element").replaceChild(textarea, input);
    }

    if (attr === "rows" || attr === "cols") {
      if (this.hasAttribute("multiline")) {
        input.setAttribute(attr, newval);
      }
    }

    if (attr === "fullwidth") {
      div.classList.add("fullwidth");
    }

    if (attr === "name") {
      input.setAttribute("name", newval);
    } else if (attr === "label") {
      label.textContent = newval;
      legend.querySelector("span").textContent = newval;
    } else if (attr === "type" && this.hasAttribute("multiline")) {
      input.type = newval;
    } else if (attr === "autocomplete") {
      input.autocomplete =
        newval === "false" || newval === "off" ? "off" : "on";
    } else {
      input.setAttribute(attr, newval);
    }
  }
}
export default TextField;
