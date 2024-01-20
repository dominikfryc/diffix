import { Checkbox } from './checkbox.js';

if (!customElements.get('dfx-checkbox')) {
  customElements.define('dfx-checkbox', Checkbox);
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-checkbox': Checkbox;
  }
}

export { Checkbox };
