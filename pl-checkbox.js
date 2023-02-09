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
                --content-width: auto;
            }

            :host([hidden]) {
                display: none;
            }

            :host([disabled]) {
                color: var(--grey-base);
                cursor: not-allowed;
				user-select: none;
            }

            :host([disabled]) .checkbox-container {
                pointer-events: none;
            }

            :host([disabled]) .caption{
                color: var(--grey-dark);
            }

            :host([orientation="vertical"]) .checkbox-container {
                height: auto;
            }

            .checkbox-container {
                display: flex;
                flex-direction: row;
                gap: var(--space-sm);
                cursor: pointer;
                align-items: center;
                height: var(--base-size-md);
            }

            .caption {
                color: var(--text-color);
                font-size: var(--text-font);
            }

            .checkbox {
                width: var(--base-size-xxs);
                height: var(--base-size-xxs);
                border: 1px solid var(--grey-base);
                border-radius: var(--border-radius);
                box-sizing: border-box;
                position: relative;
                align-self: center;
                background-color: var(--background-color);
                transition: background .3s ease-in-out;
                flex-shrink: 0;
            }

            .checkbox-container:hover .checkbox{
                border: 1px solid var(--primary-base);
            }

            .checkbox[state=checked] {
                background: var(--primary-base);
                border: 1px solid var(--primary-base);
                background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none"%3E%3Cpath d="M1 4.5L3 7L7.5 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E');
                background-repeat: no-repeat;
                background-position: center;
            }

            :host([disabled]) .checkbox[state=checked] {
                background: var(--grey-light);
                border: 1px solid var(--grey-light);
                background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none"%3E%3Cpath d="M1 4.5L3 7L7.5 1" stroke="%23AFB3C1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E');
                background-repeat: no-repeat;
                background-position: center;
            }

            .checkbox[state=checked]:hover {
                background: var(--primary-dark);
                border: 1px solid var(--primary-dark);
                background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none"%3E%3Cpath d="M1 4.5L3 7L7.5 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E');
                background-repeat: no-repeat;
                background-position: center;
            }

            .checkbox[state=indeterminate] {
                background: var(--white);
                border: 1px solid var(--grey-base);
            }

            .checkbox[state=indeterminate]:after {
                display: block;
                content: '';
                background: var(--primary-base);
                width: 8px;
                height: 2px;
                position: absolute;
                top: 6px;
                left: 3px;
            }

            .checkbox[state=indeterminate]:hover {
                border: 1px solid var(--grey-dark);
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
