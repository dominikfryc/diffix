import { LitElement, PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { FormControlMixin } from '@open-wc/form-control';
import { submit } from '@open-wc/form-helpers';
import { event, EventEmitter } from '../../utils/event';
import { innerInputValidators } from '../../utils/validators';
import style from './input.css?inline';
import eyeClosedIcon from '../../assets/eye-closed.svg?raw';
import eyeOpenedIcon from '../../assets/eye-opened.svg?raw';
import minusIcon from '../../assets/minus.svg?raw';
import plusIcon from '../../assets/plus.svg?raw';
import '../button';
import '../label';
import '../spinner';

/**
 * Allows user to provide text input
 *
 * @element dfx-input
 * @slot {html} start - Optional slot at the start of the control
 * @slot {html} end - Optional slot at the end of the control
 * @fires {string} dfx-input - Fires when value changed on keyup
 * @fires {string} dfx-change - Fires when value changed and input is blurred
 * @fires {ValidityState} dfx-invalid - Fires when value is invalid
 * @cssprop [--dfx-input-border-radius=var(--dfx-border-radius-m, 0.375rem)] - Border radius
 * @cssprop [--dfx-input-box-shadow=inset 0 0 0 var(--dfx-size-5xs, 0.0625rem) var(--dfx-color-background-border, #d4d4d8)] - Default box shadow
 * @cssprop [--dfx-input-box-shadow-active=inset 0 0 0 var(--dfx-size-5xs, 0.0625rem) var(--dfx-color-background-border-variant, #9ca3af)] - Active box shadow
 * @cssprop [--dfx-input-box-shadow-error=inset 0 0 0 var(--dfx-size-5xs, 0.0625rem) var(--dfx-color-danger-dark, #dc2626)] - Error box shadow
 * @cssprop [--dfx-input-color-background=var(--dfx-color-background-surface, #ffffff)] - Input background
 * @cssprop [--dfx-input-color-text=var(--dfx-color-text-dark, #1f2937)] - Input color
 * @cssprop [--dfx-input-font-family=var(--dfx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif)] - Input font family
 * @cssprop [--dfx-input-font-size=var(--dfx-font-size-m, 0.875rem)] - Input font size
 * @cssprop [--dfx-input-gap=calc(var(--dfx-size-xs, 0.75rem) / 2)] - Gap between items in control
 * @cssprop [--dfx-input-height=calc(var(--dfx-input-icon-size) + 2 * var(--dfx-input-padding))] - Input height
 * @cssprop [--dfx-input-icon-size=var(--dfx-size-xl, 1.5rem)] - Icon size
 * @cssprop [--dfx-input-padding=calc(var(--dfx-size-xs, 0.75rem) / 2)] - Control padding
 * @cssprop [--dfx-input-text-align=start] - Input text align
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

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.#onKeydown);
    this.form?.addEventListener('submit', () => {
      this.reportValidity();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.#onKeydown);
  }

  /** @ignore */
  #onKeydown = (event: KeyboardEvent): void => {
    if (this.form && event.code === 'Enter') {
      submit(this.form);
    }
  };

  /** @ignore */
  @state()
  private dirty = false;

  /** @ignore */
  @state()
  private passwordVisible = false;

  #passwordVisibilityToggle(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  #decreaseValue(): void {
    this.validationTarget.stepDown();
    this.value = this.validationTarget.value;
    this.dirty = true;
    this.onInput.emit(this.value);
    this.onChange.emit(this.value);
  }

  #increaseValue(): void {
    this.validationTarget.stepUp();
    this.value = this.validationTarget.value;
    this.dirty = true;
    this.onInput.emit(this.value);
    this.onChange.emit(this.value);
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
    this.value = (event.target as HTMLInputElement).value;
    this.onChange.emit(this.value);
  }

  #handleInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.onInput.emit(this.value);
  }

  protected async updated(changedProperties: PropertyValues): Promise<void> {
    if (changedProperties.has('value')) {
      this.setValue(this.value);
      await this.validationComplete;
      this.requestUpdate();
    }
  }

  formResetCallback(): void {
    this.dirty = false;
    this.value = this.getAttribute('value') ?? '';
  }

  render(): TemplateResult {
    const invalidMessage = html`<dfx-label type="error" id="label"
      >${this.validationMessage}</dfx-label
    >`;
    const helperMessage = this.helperText
      ? html`<dfx-label type="helper" id="label">${this.helperText}</dfx-label>`
      : nothing;
    const passwordInput = this.type === 'password';
    const passwordType = this.passwordVisible ? 'text' : 'password';
    const inputType = passwordInput ? passwordType : this.type;
    const togglePasswordButton = passwordInput
      ? html`<dfx-button
          part="button"
          variant="text"
          label="Toggle password visibility"
          ?disabled=${this.disabled}
          @dfx-click="${this.#passwordVisibilityToggle}"
        >
          ${unsafeSVG(this.passwordVisible ? eyeClosedIcon : eyeOpenedIcon)}
        </dfx-button>`
      : nothing;
    const step = this.step ?? 1;
    const decreaseButton =
      this.type === 'number'
        ? html`<dfx-button
            part="button"
            variant="text"
            label="Decrease value by ${step}"
            ?disabled=${this.disabled || (this.min && Number(this.value) <= Number(this.min))}
            @dfx-click="${this.#decreaseValue}"
          >
            ${unsafeSVG(minusIcon)}
          </dfx-button>`
        : nothing;
    const increaseButton =
      this.type === 'number'
        ? html`<dfx-button
            part="button"
            variant="text"
            label="Increase value by ${step}"
            ?disabled=${this.disabled || (this.max && Number(this.value) >= Number(this.max))}
            @dfx-click="${this.#increaseValue}"
          >
            ${unsafeSVG(plusIcon)}
          </dfx-button>`
        : nothing;
    const label =
      this.label && !this.hideLabel ? html`<dfx-label>${this.label}</dfx-label>` : nothing;
    const loadingSpinner = this.loading ? html`<dfx-spinner size="small"></dfx-spinner>` : nothing;
    const leftButton = decreaseButton;
    const rightButton = html`${increaseButton}${togglePasswordButton}`;
    const classes = {
      dirty: this.dirty,
      invalid: !this.checkValidity(),
    };

    return html`<label part="container" class=${classMap(classes)}>
      ${label}
      <div part="control">
        <slot name="start"> ${leftButton} </slot>
        <input
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
          @change=${this.#handleChange}
          @input=${this.#handleInput}
          aria-label=${this.label && this.hideLabel ? this.label : nothing}
          aria-invalid=${this.checkValidity() ? 'false' : 'true'}
          aria-describedby=${this.helperText || (!this.checkValidity() && this.dirty)
            ? 'label'
            : nothing}
        />
        <slot name="end"> ${loadingSpinner} ${rightButton} </slot>
      </div>
      ${!this.checkValidity() && this.dirty ? invalidMessage : helperMessage}
    </label>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-input': Input;
  }
}
