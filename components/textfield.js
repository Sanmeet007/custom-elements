const template = document.createElement("template");
template.innerHTML = `
    <!-- Styles -->
    
    <style>
         :host{
             display: block;
         }

        .form-element {
            isolation:isolate;
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
            color: rgba(255, 255, 255, 0.7);
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
            -webkit-box-align: center;
            align-items: center;
            position: relative;
            border-radius: 4px;
        }

        input {
            outline: none;
            font: inherit;
            letter-spacing: inherit;
            color: currentcolor;
            border: 0px;
            box-sizing: content-box;
            background: none;
            height: 1.4375em;
            margin: 0px;
            -webkit-tap-highlight-color: transparent;
            display: block;
            min-width: 0px;
            width: 100%;
            animation-name: animate;
            animation-duration: 10ms;
            padding: 16.5px 14px;
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
            border-color: rgba(255, 255, 255, 0.23);
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

        legend>span {
            padding-left: 5px;
            padding-right: 5px;
            display: inline-block;
        }

        .label-focused {
            color: rgba(255, 255, 255, 0.7);
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
            max-width: calc(133% - 24px);
            position: absolute;
            left: 0px;
            top: 0px;
            transform: translate(14px, -9px) scale(0.75);
            transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
            z-index: 1;
            pointer-events: auto;
            user-select: none;
        }

        .legend-focused {
            float: unset;
            display: block;
            width: auto;
            padding: 0px;
            height: 11px;
            font-size: 0.75em;
            visibility: hidden;
            max-width: 100%;
            transition: max-width 100ms cubic-bezier(0, 0, 0.2, 1) 50ms;
            white-space: nowrap;
        }

        .fieldset-focused {
            border-color: var(--accent-clr);
        }
        
        @keyframes animate {
            0% {
                display: block;
            }
        }

        .form-element:focus-within > label{
            color: var(--accent-clr)
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
        return ["name", "label", "type"];
    }

    get value() {
        return this._value;
    }

    set value(v) {
        const input = this.shadowRoot.querySelector("input");
        const label = this.shadowRoot.querySelector("label");
        const legend = this.shadowRoot.querySelector("legend");
        label.classList.add("label-focused");
        legend.classList.add("legend-focused");

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
        this.dispatchEvent(this.#changeEvent)
    }
    connectedCallback() {
        const input = this.shadowRoot.querySelector("input");
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
        })

        const initialValue = this.getAttribute("initial");
        if (initialValue != "" && initialValue != null && initialValue != undefined) {
            label.classList.add("label-focused");
            legend.classList.add("legend-focused");
            this.value = initialValue;
        }
    }

    attributeChangedCallback(attr, _, newval) {
        if (attr === "name") {
            const input = this.shadowRoot.querySelector("input");
            input.setAttribute("name", newval);
        } else if (attr === "label") {
            const label = this.shadowRoot.querySelector("label");
            const legend = this.shadowRoot.querySelector("legend");
            label.textContent = newval;
            legend.textContent = newval;
        } else if (attr === "type") {
            const input = this.shadowRoot.querySelector("input");
            input.type = newval;
        }
    }
}
export default TextField;
