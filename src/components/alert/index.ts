import { Alert } from './alert.js';

if (!customElements.get('dfx-alert')) {
  customElements.define('dfx-alert', Alert);
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-alert': Alert;
  }
}

export { Alert };
