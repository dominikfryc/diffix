import { LitElement, PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { FormControlMixin } from '@open-wc/form-control';
import { event, EventEmitter } from '../../utils/event.js';
import { innerInputValidators } from '../../utils/validators.js';
import style from './checkbox.css?raw';
import '../label/index.js';

/**
 * Allows user to select an option.
 *
 * @element dfx-checkbox
 * @slot {html} slot - Default slot for label
 * @fires {boolean} dfx-change - Fires when checkbox is checked
 * @fires {ValidityState} dfx-invalid - Fires when state of checkbox is invalid
 * @cssprop [--dfx-checkbox-border-radius=var(--dfx-border-radius-m, 0.375rem)] - Border radius
 * @cssprop [--dfx-checkbox-color=var(--dfx-color-primary-dark, #0063eb)] - Checked state color
 * @cssprop [--dfx-checkbox-check-size=var(--dfx-size-xs, 0.75rem)] - Size of checkmark icon
 * @cssprop [--dfx-checkbox-focus-offset=var(--dfx-form-outline-offset, 0.2rem)] - Checkbox focus offset
 * @cssprop [--dfx-checkbox-font-family=var(--dfx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif)] - Label font family
 * @cssprop [--dfx-checkbox-font-size=var(--dfx-font-size-m, 0.875rem)] - Label font size
 * @cssprop [--dfx-checkbox-gap=var(--dfx-size-2xs, 0.5rem)] - Gap between checkbox and label
 * @cssprop [--dfx-checkbox-line-height=var(--dfx-line-height-m, 1.5)] - Label line height
 * @cssprop [--dfx-checkbox-size=var(--dfx-size-l, 1.25rem)] - Checkbox size
 * @cssprop [--dfx-checkbox-switch-size=var(--dfx-size-2xl, 2rem)] - Checkbox type `switch` width
 * @cssprop [--dfx-checkbox-transition=all var(--dfx-transition-medium, 0.2s ease-in-out)] - Transition
 * @csspart input - Input element
 * @csspart label - Label element
 * @csspart container - Container element
 */
export class Checkbox extends FormControlMixin(LitElement) {
  static styles = unsafeCSS(style);

  /** @ignore */
  static formControlValidators = innerInputValidators;

  /** @ignore */
  @query('input')
  validationTarget: HTMLInputElement;

  /**
   * Sets checked state of checkbox
   */
  @property({ type: Boolean })
  checked = false;

  /**
   * Sets name of checkbox (when set, it shows in form data)
   */
  @property({ type: String, reflect: true })
  name: string;

  /**
   * Sets value of checkbox
   */
  @property({ type: String })
  value: string;

  /**
   * Sets type of checkbox
   */
  @property({ type: String, reflect: true })
  type: 'checkbox' | 'switch' = 'checkbox';

  /**
   * Sets checkbox as required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Sets checkbox as disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets helper text of checkbox
   */
  @property({ type: String, attribute: 'helper-text', reflect: true })
  helperText: string;

  /**
   * Fires when checkbox is checked
   * @ignore
   */
  @event('dfx-change')
  private onChange: EventEmitter<boolean>;

  /**
   * Fires when state of checkbox is invalid
   * @ignore
   */
  @event('dfx-invalid')
  private onInvalid: EventEmitter<ValidityState>;

  /**
   * Signals that value of checkbox changed
   * @ignore
   */
  @state()
  private dirty = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('invalid', this.#handleInvalid);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('invalid', this.#handleInvalid);
  }

  #handleInvalid(): void {
    this.dirty = true;
  }

  #handleChange(event: Event & { target: HTMLInputElement }) {
    this.dirty = true;
    this.checked = event.target.checked;
    this.onChange.emit(this.checked, { bubbles: true });
  }

  override validityCallback(): string {
    this.onInvalid.emit(this.internals.validity);
    return this.validationTarget?.validationMessage;
  }

  override async updated(changedProperties: PropertyValues): Promise<void> {
    if (changedProperties.has('value') || changedProperties.has('checked')) {
      this.setValue(this.checked ? this.value : null);
      await this.validationComplete;
      this.requestUpdate();
    }
  }

  override resetFormControl(): void {
    this.dirty = false;
    this.checked = this.hasAttribute('checked');
  }

  override focus(): void {
    this.validationTarget.focus();
  }

  #renderError(): TemplateResult {
    return html`<dfx-label type="error" id="label">${this.validationMessage}</dfx-label>`;
  }

  #renderHelper(): TemplateResult {
    return this.helperText
      ? html`<dfx-label type="helper" id="label">${this.helperText}</dfx-label>`
      : html``;
  }

  /** @ignore */
  get #showError(): boolean {
    return !this.validity.valid && this.dirty;
  }

  render(): TemplateResult {
    return html`
      <label part="container" class=${this.#showError ? 'invalid' : nothing}>
        <input
          part="input"
          type="checkbox"
          .checked=${live(this.checked)}
          name=${this.name ?? nothing}
          value=${this.value ?? nothing}
          role=${this.type === 'switch' ? 'switch' : nothing}
          ?required=${this.required}
          ?disabled=${this.disabled}
          @change=${this.#handleChange}
          aria-describedby=${this.helperText || this.#showError ? 'label' : nothing}
        />
        <div part="label">
          <slot></slot>
          ${this.#showError ? this.#renderError() : this.#renderHelper()}
        </div>
      </label>
    `;
  }
}
