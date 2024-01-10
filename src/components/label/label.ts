import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import style from './label.css?raw';

/**
 * Displays label for form field
 *
 * @element dfx-label
 * @slot {html} slot - Default slot for label content
 * @cssprop [--dfx-label-color=var(--dfx-color-text-dark, #1f2937)] - Label color
 * @cssprop [--dfx-label-font-family=var(--dfx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif)] - Label font family
 * @cssprop [--dfx-label-font-size=var(--dfx-font-size-m, 0.875rem)] - Label font size
 * @cssprop [--dfx-label-font-weight=var(--dfx-font-weight-semibold, 600)] - Label font weight
 * @cssprop [--dfx-label-line-height=var(--dfx-line-height-m, 1.5)] - Label line height
 */
@customElement('dfx-label')
export class Label extends LitElement {
  static styles = unsafeCSS(style);

  /**
   * Sets type of label
   */
  @property({ type: String, reflect: true })
  type: 'control' | 'error' | 'helper' = 'control';

  render(): TemplateResult {
    return html`
      <div aria-live=${this.type === 'error' ? 'polite' : 'off'}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-label': Label;
  }
}
