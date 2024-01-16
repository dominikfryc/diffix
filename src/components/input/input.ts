import { LitElement, PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { FormControlMixin } from '@open-wc/form-control';
import { event, EventEmitter } from '../../utils/event.js';
import { innerInputValidators } from '../../utils/validators.js';
import style from './input.css?raw';
import eyeClosedIcon from '../../assets/eye-closed.svg?raw';
import eyeOpenedIcon from '../../assets/eye-opened.svg?raw';
import minusIcon from '../../assets/minus.svg?raw';
import plusIcon from '../../assets/plus.svg?raw';
import '../button/index.js';
import '../label/index.js';
import '../spinner/index.js';

/**
 * Allows user to provide text input.
 *
 * @element dfx-input
 * @slot {html} start - Optional slot at the start of the control
 * @slot {html} end - Optional slot at the end of the control
 * @fires {string} dfx-input - Fires when value changed on keyup
 * @fires {string} dfx-change - Fires when value changed and input is blurred
 * @fires {ValidityState} dfx-invalid - Fires when value is invalid
 * @cssprop [--dfx-input-border-radius=var(--dfx-border-radius-m, 0.375rem)] - Border radius
 * @cssprop [--dfx-input-color-background=var(--dfx-color-background-light, #ffffff)] - Input background
 * @cssprop [--dfx-input-color-text=var(--dfx-color-text-dark, #383d46)] - Input color
 * @cssprop [--dfx-input-font-family=var(--dfx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif)] - Input font family
 * @cssprop [--dfx-input-font-size=var(--dfx-font-size-m, 0.875rem)] - Input font size
 * @cssprop [--dfx-input-gap=calc(var(--dfx-size-xs, 0.75rem) / 2)] - Gap between items in control
 * @cssprop [--dfx-input-height=calc(var(--dfx-input-icon-size) + 2 * var(--dfx-input-padding))] - Input height
 * @cssprop [--dfx-input-icon-size=var(--dfx-size-xl, 1.5rem)] - Icon size
 * @cssprop [--dfx-input-padding=calc(var(--dfx-size-xs, 0.75rem) / 2)] - Control padding
 * @cssprop [--dfx-input-text-align=start] - Input text align
 * @cssprop [--dfx-input-transition=all var(--dfx-transition-medium, 0.2s ease-in-out)] - Input transition
 * @cssprop [--dfx-input-width=calc(var(--dfx-size-3xl, 2.5rem) * 5)] - Component width
 * @csspart input - Input element
 * @csspart control - Control element
 * @csspart container - Container element
 * @csspart button - Button element
 */
@customElement('dfx-input')
export class Input extends FormControlMixin(LitElement) {
  static styles = unsafeCSS(style);

  /** @ignore */
  static formControlValidators = innerInputValidators;

  /** @ignore */
  @query('input')
  validationTarget: HTMLInputElement;

  /**
   * Sets name of input
   */
  @property({ type: String, reflect: true })
  name: string;

  /**
   * Sets value of input
   */
  @property({ type: String })
  value = '';

  /**
   * Sets type of input
   */
  @property({ type: String, reflect: true })
  type:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week' = 'text';

  /**
   * Sets label of input
   */
  @property({ type: String, reflect: true })
  label: string;

  /**
   * Sets placeholder of input
   */
  @property({ type: String, reflect: true })
  placeholder: string;

  /**
   * Sets input as required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Sets input validation of minimum length
   */
  @property({ type: Number, reflect: true })
  minlength: number;

  /**
   * Sets input validation of maximum length
   */
  @property({ type: Number, reflect: true })
  maxlength: number;

  /**
   * Sets input validation of minimum value
   */
  @property({ type: Number, reflect: true })
  min: number;

  /**
   * Sets input validation of maximum value
   */
  @property({ type: Number, reflect: true })
  max: number;

  /**
   * Sets step of input
   */
  @property({ type: Number, reflect: true })
  step: number;

  /**
   * Sets input validation by regex pattern
   */
  @property({ type: String, reflect: true })
  pattern: string;

  /**
   * Sets autocomplete of input
   */
  @property({ type: String, reflect: true })
  autocomplete: string;

  /**
   * Sets input as disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets input as loading
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Sets input as readonly
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Sets input mode to show correct virtual keyboard
   */
  @property({ type: String, reflect: true })
  inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  /**
   * Sets helper text of input
   */
  @property({ type: String, attribute: 'helper-text', reflect: true })
  helperText: string;

  /**
   * Hides label of input
   */
  @property({ type: Boolean, attribute: 'hide-label', reflect: true })
  hideLabel = false;

  /**
   * Fires when value of input changed on keyup
   * @ignore
   */
  @event('dfx-input')
  private onInput: EventEmitter<string>;

  /**
   * Fires when value of input changed and input is blurred
   * @ignore
   */
  @event('dfx-change')
  private onChange: EventEmitter<string>;

  /**
   * Fires when value of input is invalid
   * @ignore
   */
  @event('dfx-invalid')
  private onInvalid: EventEmitter<ValidityState>;

  /**
   * Signals that value of input changed
   * @ignore
   */
  @state()
  private dirty = false;

  /**
   * Sets visibility of password
   * @ignore
   */
  @state()
  private passwordVisible = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('invalid', this.#handleInvalid);
    this.addEventListener('keydown', this.#handleKeydown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('invalid', this.#handleInvalid);
    this.removeEventListener('keydown', this.#handleKeydown);
  }

  #handleInvalid(): void {
    this.dirty = true;
  }

  #handleKeydown(event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      this.form?.requestSubmit();
    }
  }

  #handleInput(event: Event & { target: HTMLInputElement }): void {
    this.value = event.target.value;
    this.onInput.emit(this.value);
  }

  #handleChange(event: Event & { target: HTMLInputElement }): void {
    this.dirty = true;
    this.value = event.target.value;
    this.onChange.emit(this.value);
  }

  #setValueFromInput(): void {
    this.value = this.validationTarget.value;
    this.dirty = true;
    this.onInput.emit(this.value);
    this.onChange.emit(this.value);
  }

  #decreaseValue(): void {
    this.validationTarget.stepDown();
    this.#setValueFromInput();
  }

  #increaseValue(): void {
    this.validationTarget.stepUp();
    this.#setValueFromInput();
  }

  #togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  override validityCallback(): string {
    this.onInvalid.emit(this.internals.validity);
    return this.validationTarget?.validationMessage;
  }

  override async updated(changedProperties: PropertyValues): Promise<void> {
    if (changedProperties.has('value')) {
      this.setValue(this.value);
      await this.validationComplete;
      this.requestUpdate();
    }
  }

  override resetFormControl(): void {
    this.dirty = false;
    this.value = this.getAttribute('value') ?? '';
  }

  #renderError(): TemplateResult {
    return html`<dfx-label type="error" id="label">${this.validationMessage}</dfx-label>`;
  }

  #renderHelper(): TemplateResult {
    return this.helperText
      ? html`<dfx-label type="helper" id="label">${this.helperText}</dfx-label>`
      : html``;
  }

  #renderDecreaseButton(): TemplateResult {
    return html`
      <dfx-button
        part="button"
        variant="text"
        label="Decrease value by ${this.step ?? 1}"
        ?disabled=${this.disabled ||
        (this.min !== undefined ? Number(this.value) <= this.min : false)}
        @dfx-click="${this.#decreaseValue}"
      >
        ${unsafeSVG(minusIcon)}
      </dfx-button>
    `;
  }

  #renderIncreaseButton(): TemplateResult {
    return html`
      <dfx-button
        part="button"
        variant="text"
        label="Increase value by ${this.step ?? 1}"
        ?disabled=${this.disabled ||
        (this.max !== undefined ? Number(this.value) >= this.max : false)}
        @dfx-click="${this.#increaseValue}"
      >
        ${unsafeSVG(plusIcon)}
      </dfx-button>
    `;
  }

  #renderTogglePasswordButton(): TemplateResult {
    return html`
      <dfx-button
        part="button"
        variant="text"
        label="Toggle password visibility"
        ?disabled=${this.disabled}
        @dfx-click="${this.#togglePasswordVisibility}"
      >
        ${unsafeSVG(this.passwordVisible ? eyeClosedIcon : eyeOpenedIcon)}
      </dfx-button>
    `;
  }

  #renderLeftButton(): TemplateResult {
    if (this.type === 'number') {
      return this.#renderDecreaseButton();
    }
    return html``;
  }

  #renderRightButton(): TemplateResult {
    if (this.type === 'password') {
      return this.#renderTogglePasswordButton();
    }
    if (this.type === 'number') {
      return this.#renderIncreaseButton();
    }
    return html``;
  }

  #renderSpinner(): TemplateResult {
    return this.loading ? html`<dfx-spinner size="small"></dfx-spinner>` : html``;
  }

  #renderLabel(): TemplateResult {
    return html`<label for=${this.#id}><dfx-label>${this.label}</dfx-label></label>`;
  }

  /** @ignore */
  get #showError(): boolean {
    return !this.validity.valid && this.dirty;
  }

  /** @ignore */
  #id = Math.random().toString(36).substring(2);

  render(): TemplateResult {
    const passwordType = this.passwordVisible ? 'text' : 'password';
    const inputType = this.type === 'password' ? passwordType : this.type;

    return html`
      <div part="container" class=${this.#showError ? 'invalid' : nothing}>
        ${this.label && !this.hideLabel ? this.#renderLabel() : nothing}
        <div part="control">
          <slot name="start"> ${this.#renderLeftButton()} </slot>
          <input
            id=${this.#id}
            part="input"
            .value=${live(this.value)}
            type=${inputType}
            inputmode="${this.inputmode ?? nothing}"
            autocomplete="${this.autocomplete ?? nothing}"
            placeholder="${this.placeholder ?? nothing}"
            minlength="${this.minlength ?? nothing}"
            maxlength="${this.maxlength ?? nothing}"
            min="${this.min ?? nothing}"
            max="${this.max ?? nothing}"
            pattern="${this.pattern ?? nothing}"
            step="${this.step ?? nothing}"
            ?required=${this.required}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            @input=${this.#handleInput}
            @change=${this.#handleChange}
            aria-label=${this.label && this.hideLabel ? this.label : nothing}
            aria-invalid=${this.#showError}
            aria-describedby=${this.helperText || this.#showError ? 'label' : nothing}
          />
          <slot name="end"> ${this.#renderSpinner()} ${this.#renderRightButton()} </slot>
        </div>
        ${this.#showError ? this.#renderError() : this.#renderHelper()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-input': Input;
  }
}
