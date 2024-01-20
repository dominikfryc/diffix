import { Button } from './button.js';

if (!customElements.get('dfx-button')) {
  customElements.define('dfx-button', Button);
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-button': Button;
  }
}

export { Button };
