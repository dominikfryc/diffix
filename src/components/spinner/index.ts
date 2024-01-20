import { Spinner } from './spinner.js';

if (!customElements.get('dfx-spinner')) {
  customElements.define('dfx-spinner', Spinner);
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-spinner': Spinner;
  }
}

export { Spinner };
