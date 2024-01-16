import { LitElement, PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { FormControlMixin } from '@open-wc/form-control';
import { event, EventEmitter } from '../../utils/event.js';
import style from './radio.css?raw';
import '../label/index.js';

/**
 * Allows user to select a single option
 *
 * @element dfx-radio
 * @slot {html} slot - Default slot for label
 * @fires {boolean} dfx-change - Fires when radio is checked
 * @cssprop [--dfx-radio-border-radius=var(--dfx-border-radius-full, 62.438rem)] - Border radius
 * @cssprop [--dfx-radio-color=var(--dfx-color-primary-dark, #0063eb)] - Checked state color
 * @cssprop [--dfx-radio-focus-offset=var(--dfx-form-outline-offset, 0.2rem)] - Radio focus offset
 * @cssprop [--dfx-radio-font-family=var(--dfx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif)] - Label font family
 * @cssprop [--dfx-radio-font-size=var(--dfx-font-size-m, 0.875rem)] - Label font size
 * @cssprop [--dfx-radio-gap=var(--dfx-size-2xs, 0.5rem)] - Gap between radio and label
 * @cssprop [--dfx-radio-line-height=var(--dfx-line-height-m, 1.5)] - Label line height
 * @cssprop [--dfx-radio-size=var(--dfx-size-l, 1.25rem)] - Radio size
 * @cssprop [--dfx-radio-transition=all var(--dfx-transition-medium, 0.2s ease-in-out)] - Transition
 * @csspart input - Input element
 * @csspart label - Label element
 * @csspart container - Container element
 */
@customElement('dfx-radio')
export class Radio extends FormControlMixin(LitElement) {
  static styles = unsafeCSS(style);

  /** @ignore */
  @query('input')
  validationTarget: HTMLInputElement;

  /**
   * Sets checked state of radio
   */
  @property({ type: Boolean })
  checked = false;

  /**
   * Sets value of radio
   */
  @property({ type: String })
  value: string;

  /**
   * Sets radio as disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets helper text of radio
   */
  @property({ type: String, attribute: 'helper-text', reflect: true })
  helperText: string;

  /**
   * Fires when radio is checked
   * @ignore
   */
  @event('dfx-change')
  private onChange: EventEmitter<boolean>;

  #handleChange(event: Event & { target: HTMLInputElement }) {
    this.checked = event.target.checked;
    this.onChange.emit(this.checked, { bubbles: true });
  }

  override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('value') || changedProperties.has('checked')) {
      this.setValue(this.checked ? this.value : null);
    }
  }

  override resetFormControl(): void {
    this.checked = this.hasAttribute('checked');
  }

  override focus(): void {
    this.validationTarget.tabIndex = 0;
    this.validationTarget.focus();
  }

  override blur(): void {
    this.validationTarget.tabIndex = -1;
  }

  #renderHelper(): TemplateResult {
    return html`<dfx-label type="helper" id="label">${this.helperText}</dfx-label>`;
  }

  render(): TemplateResult {
    return html`<label part="container">
      <input
        part="input"
        type="radio"
        autocomplete="off"
        tabindex="-1"
        .checked=${live(this.checked)}
        value=${this.value ?? nothing}
        ?disabled=${this.disabled}
        @blur=${this.blur}
        @change=${this.#handleChange}
        aria-describedby=${this.helperText ? 'label' : nothing}
      />
      <div part="label">
        <slot></slot>
        ${this.helperText ? this.#renderHelper() : nothing}
      </div>
    </label>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-radio': Radio;
  }
}
