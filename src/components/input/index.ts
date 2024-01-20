import { Input } from './input.js';

if (!customElements.get('dfx-input')) {
  customElements.define('dfx-input', Input);
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-input': Input;
  }
}

export { Input };
