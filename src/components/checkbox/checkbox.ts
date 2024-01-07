import { LitElement, PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { FormControlMixin } from '@open-wc/form-control';
import { event, EventEmitter } from '../../utils/event';
import { innerInputValidators } from '../../utils/validators';
import style from './checkbox.css?inline';
import '../label';

/**
 * Allows user to select an option
 *
 * @element dfx-checkbox
 * @slot {html} slot - Default slot for label
 * @fires {boolean} dfx-change - Fires when checkbox is checked
 * @fires {ValidityState} dfx-invalid - Fires when state of checkbox is invalid
 * @cssprop [--dfx-checkbox-border-radius=var(--dfx-border-radius-m, 0.375rem)] - Border radius
 * @cssprop [--dfx-checkbox-box-shadow=inset 0 0 0 var(--dfx-size-5xs, 0.0625rem) var(--dfx-color-background-border, #d4d4d8)] - Default box shadow
 * @cssprop [--dfx-checkbox-box-shadow-checked=inset 0 0 0 var(--dfx-size-5xs, 0.0625rem) var(--dfx-checkbox-color)] - Box shadow for checked state
 * @cssprop [--dfx-checkbox-box-shadow-error=inset 0 0 0 var(--dfx-size-5xs, 0.0625rem) var(--dfx-color-danger-dark, #dc2626)] - Box shadow for error state
 * @cssprop [--dfx-checkbox-color=var(--dfx-color-primary-dark, #2563eb)] - Checked state color
 * @cssprop [--dfx-checkbox-check-size=var(--dfx-size-xs, 0.75rem)] - Size of checkmark icon
 * @cssprop [--dfx-checkbox-focus-offset=var(--dfx-form-outline-offset, 0.25rem)] - Checkbox focus offset
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
@customElement('dfx-checkbox')
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

  /** @ignore */
  @state()
  private dirty = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.form?.addEventListener('submit', () => {
      this.reportValidity();
    });
  }

  validityCallback(): string | void {
    this.onInvalid.emit(this.internals.validity);
    return this.validationTarget?.validationMessage;
  }

  reportValidity(): boolean {
    this.dirty = true;
    return this.checkValidity();
  }

  #handleChange(event: Event) {
    this.dirty = true;
    this.checked = (event.target as HTMLInputElement).checked;
    this.onChange.emit(this.checked, { bubbles: true });
  }

  protected async updated(changedProperties: PropertyValues): Promise<void> {
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

  focus(): void {
    this.validationTarget.focus();
  }

  render(): TemplateResult {
    const invalidMessage = html`<dfx-label type="error" id="label"
      >${this.validationMessage}</dfx-label
    >`;
    const helperMessage = this.helperText
      ? html`<dfx-label type="helper" id="label">${this.helperText}</dfx-label>`
      : nothing;
    const classes = {
      dirty: this.dirty,
      invalid: !this.checkValidity(),
    };

    return html`<label part="container" class=${classMap(classes)}>
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
        aria-describedby=${this.helperText || (!this.checkValidity() && this.dirty)
          ? 'label'
          : nothing}
      />
      <div part="label">
        <slot></slot>
        ${!this.checkValidity() && this.dirty ? invalidMessage : helperMessage}
      </div>
    </label>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-checkbox': Checkbox;
  }
}
