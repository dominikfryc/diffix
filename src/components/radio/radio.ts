import { LitElement, PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { FormControlMixin } from '@open-wc/form-control';
import { event, EventEmitter } from '../../utils/event';
import style from './radio.css?inline';
import '../label';

/**
 * Allows user to select a single option
 *
 * @element dfx-radio
 * @slot {html} slot - Default slot for label
 * @fires {boolean} dfx-change - Fires when radio is checked
 * @cssprop [--dfx-radio-border-radius=var(--dfx-border-radius-full, 62.438rem)] - Border radius
 * @cssprop [--dfx-radio-box-shadow=inset 0 0 0 var(--dfx-size-5xs, 0.0625rem) var(--dfx-color-background-border, #d4d4d8)] - Default box shadow
 * @cssprop [--dfx-radio-box-shadow-checked=inset 0 0 0 calc(var(--dfx-size-xs, 0.75rem) / 2) var(--dfx-radio-color)] - Box shadow for checked state
 * @cssprop [--dfx-radio-box-shadow-disabled=inset 0 0 0 calc(var(--dfx-size-xs, 0.75rem) / 2) var(--dfx-color-background-border, #d1d5db)] - Box shadow for error state
 * @cssprop [--dfx-radio-color=var(--dfx-color-primary-dark, #2563eb)] - Checked state color
 * @cssprop [--dfx-radio-focus-offset=var(--dfx-form-outline-offset, 0.25rem)] - Radio focus offset
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

  #handleChange(event: Event) {
    this.checked = (event.target as HTMLInputElement).checked;
    this.onChange.emit(this.checked, { bubbles: true });
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('value') || changedProperties.has('checked')) {
      this.setValue(this.checked ? this.value : null);
    }
  }

  override resetFormControl(): void {
    this.checked = this.hasAttribute('checked');
  }

  focus(): void {
    this.validationTarget.tabIndex = 0;
    this.validationTarget.focus();
  }

  blur(): void {
    this.validationTarget.tabIndex = -1;
  }

  render(): TemplateResult {
    const helperMessage = this.helperText
      ? html`<dfx-label type="helper" id="label">${this.helperText}</dfx-label>`
      : nothing;

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
        ${helperMessage}
      </div>
    </label>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-radio': Radio;
  }
}
