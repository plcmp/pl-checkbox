import { PlElement, html, css } from "polylib";
import "@plcmp/pl-labeled-container";

class PlCheckbox extends PlElement {
    static properties = {
        label: { type: String },
        orientation: { type: String, reflectToAttribute: true },

        caption: { type: String },
        disabled: { type: Boolean, reflectToAttribute: true },
        hidden: { type: Boolean, reflectToAttribute: true },
        readonly: { type: Boolean, reflectToAttribute: true },

        checked: { type: Boolean, observer: '_checkedObserver' }
    };


    static css = css`
            :host {
                display: inline-block;
                outline: none;
                --pl-content-width: auto;
            }

            :host([hidden]) {
                display: none;
            }

            :host([disabled]) {
                color: var(--pl-grey-base);
                cursor: not-allowed;
				user-select: none;
            }

            :host([disabled]) .checkbox-container {
                pointer-events: none;
            }

            :host([disabled]) .caption{
                color: var(--pl-grey-dark);
            }

            :host([orientation="vertical"]) .checkbox-container {
                height: auto;
            }

            .checkbox-container {
                display: flex;
                flex-direction: row;
                gap: var(--pl-space-sm);
                cursor: pointer;
                align-items: center;
                height: var(--pl-base-size);
            }

            .caption {
                color: var(--pl-text-color);
                font-size: var(--pl-text-font);
            }

            .checkbox {
                width: calc(var(--pl-base-size) / 2 + 2px);
                height: calc(var(--pl-base-size) / 2 + 2px);
                border: 1px solid var(--pl-grey-base);
                border-radius: var(--pl-border-radius);
                box-sizing: border-box;
                position: relative;
                align-self: center;
                background-color: var(--pl-background-color);
                transition: background .3s ease-in-out;
                flex-shrink: 0;
            }

            .checkbox-container:hover .checkbox{
                border: 1px solid var(--pl-primary-base);
            }

            .checkbox[state=checked] {
                background: var(--pl-primary-base);
                border: 1px solid var(--pl-primary-base);
                background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none"%3E%3Cpath d="M1 4.5L3 7L7.5 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E');
                background-repeat: no-repeat;
                background-position: center;
            }

            :host([disabled]) .checkbox[state=checked] {
                background: var(--pl-grey-light);
                border: 1px solid var(--pl-grey-light);
                background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none"%3E%3Cpath d="M1 4.5L3 7L7.5 1" stroke="%23AFB3C1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E');
                background-repeat: no-repeat;
                background-position: center;
            }

            .checkbox[state=checked]:hover {
                background: var(--pl-primary-dark);
                border: 1px solid var(--pl-primary-dark);
                background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none"%3E%3Cpath d="M1 4.5L3 7L7.5 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E');
                background-repeat: no-repeat;
                background-position: center;
            }

            .checkbox[state=indeterminate] {
                background: var(--pl-background-color);
                border: 1px solid var(--pl-grey-base);
            }

            .checkbox[state=indeterminate]:after {
                display: block;
                content: '';
                background: var(--pl-primary-base);
                width: 8px;
                height: 2px;
                position: absolute;
                top: 6px;
                left: 3px;
            }

            .checkbox[state=indeterminate]:hover {
                border: 1px solid var(--pl-grey-dark);
            }
    `;

    static template = html`
            <pl-labeled-container label="[[label]]" orientation="[[orientation]]">
                <slot name="label-prefix" slot="label-prefix"></slot>
                <div class="checkbox-container" on-click="[[_onClick]]">
                    <div id="checkbox" class="checkbox"></div>
                    <div class="caption">[[caption]]</div>
                </div>
                <slot name="label-suffix" slot="label-suffix"></slot>
            </pl-labeled-container>
    `;

    _checkedObserver(v) {
        if (v === undefined || v === null)
            this.$.checkbox.setAttribute('state', 'indeterminate');
        else if (v)
            this.$.checkbox.setAttribute('state', 'checked');
        else
            this.$.checkbox.setAttribute('state', 'unchecked');
    }

    _onClick() {
        if (this.readonly) return;
        this.checked = !this.checked;
    }
}

customElements.define('pl-checkbox', PlCheckbox);
