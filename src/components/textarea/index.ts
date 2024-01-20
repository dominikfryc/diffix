import { Textarea } from './textarea.js';

if (!customElements.get('dfx-textarea')) {
  customElements.define('dfx-textarea', Textarea);
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-textarea': Textarea;
  }
}

export { Textarea };
