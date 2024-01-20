import { CheckboxGroup } from './checkbox-group.js';

if (!customElements.get('dfx-checkbox-group')) {
  customElements.define('dfx-checkbox-group', CheckboxGroup);
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-checkbox-group': CheckboxGroup;
  }
}

export { CheckboxGroup };
