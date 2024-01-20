import { Radio } from './radio.js';

if (!customElements.get('dfx-radio')) {
  customElements.define('dfx-radio', Radio);
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-radio': Radio;
  }
}

export { Radio };
