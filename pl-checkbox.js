import { PlElement, html, css } from "polylib";

import "@plcmp/pl-labeled-container";

class PlCheckbox extends PlElement {
    static get properties() {
        return {
            label: { type: String },
            variant: { type: String },
            disabled: { type: Boolean, reflectToAttribute: true },
            checked: { type: Boolean, observer: '_checkedObserver' }
        }
    }

    static get css() {
        return css`
            :host([disabled]) {
                color: var(--grey-base);
                cursor: not-allowed;
                pointer-events: none;
				user-select: none;
            }

            .checkbox {
                width: 16px;
                height: 16px;
                border: 1px solid var(--grey-light);
                border-radius: 4px;
                cursor: pointer;
                position: relative;
                align-self: center;
            }

            .checkbox:hover{
                border: 1px solid var(--grey-dark);
            }

            .checkbox.checked {
                background: var(--primary-base);
                border: 1px solid var(--primary-base);
                background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none"%3E%3Cpath d="M1 4.5L3 7L7.5 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E');
                background-repeat: no-repeat;
                background-position: center;
            }

            .checkbox.checked:hover {
                background: var(--primary-dark);
                border: 1px solid var(--primary-dark);
                background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none"%3E%3Cpath d="M1 4.5L3 7L7.5 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E');
                background-repeat: no-repeat;
                background-position: center;
            }

            .checkbox.indeterminate {
                background: var(--white);
                border: 1px solid var(--grey-light);
            }

            .checkbox.indeterminate:after {
                display: block;
                content: '';
                background: var(--primary-base);
                width: 8px;
                height: 2px;
                position: absolute;
                top: 7px;
                left: 4px;
            }

            .checkbox.indeterminate:hover {
                border: 1px solid var(--grey-dark);
            }
		`;
    }


    connectedCallback() {
        super.connectedCallback();
        this._checkboxContainer = this.root.querySelector('.checkbox');
        this._checkedObserver();
    }

    static get template() {
        return html`
            <pl-labeled-container label="[[label]]" variant$="[[variant]]">
                <slot name="label-prefix" slot="label-prefix"></slot>
                <span class="checkbox" on-click="[[_onClick]]"></span>
                <slot name="label-suffix" slot="label-suffix"></slot>
            </pl-labeled-container>
		`;
    }

    _checkedObserver() {
        if (this.checked === undefined) {
            this._checkboxContainer.classList.add('indeterminate');
        } else {
            this._checkboxContainer.classList.remove('indeterminate');
        }

        if (this.checked) {
            this._checkboxContainer.classList.add('checked');
        } else {
            this._checkboxContainer.classList.remove('checked');
        }
    }

    _onClick() {
        this.checked = !this.checked;
    }
}

customElements.define('pl-checkbox', PlCheckbox);
