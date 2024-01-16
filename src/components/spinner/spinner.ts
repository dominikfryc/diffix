import { LitElement, TemplateResult, unsafeCSS, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import icon from '../../assets/spinner.svg?raw';
import style from './spinner.css?raw';

/**
 * Symbolizes that user action is being processed.
 *
 * @element dfx-spinner
 * @cssprop [--dfx-spinner-color=currentColor] - Spinner color
 * @cssprop [--dfx-spinner-font-family=var(--dfx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif)] - Label font family
 * @cssprop [--dfx-spinner-font-size=var(--dfx-font-size-m, 0.875rem)] - Label font size
 * @cssprop [--dfx-spinner-gap=var(--dfx-size-2xs, 0.5rem)] - Gap between spinner and label
 * @cssprop [--dfx-spinner-line-height=var(--dfx-line-height-m, 1.5)] - Label line height
 * @cssprop [--dfx-spinner-padding=0] - Spinner padding
 * @cssprop [--dfx-spinner-size=var(--dfx-size-2xl, 2rem)] - Spinner size
 */
@customElement('dfx-spinner')
export class Spinner extends LitElement {
  static styles = unsafeCSS(style);

  /**
   * Sets size of the spinner
   */
  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Sets label of the spinner
   */
  @property({ type: String, reflect: true })
  label: string;

  render(): TemplateResult {
    const label = html`<span>${this.label}</span>`;
    return html`${unsafeSVG(icon)} ${this.label ? label : nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-spinner': Spinner;
  }
}
