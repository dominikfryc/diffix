import { RadioGroup } from './radio-group.js';

if (!customElements.get('dfx-radio-group')) {
  customElements.define('dfx-radio-group', RadioGroup);
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-radio-group': RadioGroup;
  }
}

export { RadioGroup };
