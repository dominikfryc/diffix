import { Label } from './label.js';

if (!customElements.get('dfx-label')) {
  customElements.define('dfx-label', Label);
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-label': Label;
  }
}

export { Label };
