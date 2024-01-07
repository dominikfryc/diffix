import { LitElement, PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { FormControlMixin } from '@open-wc/form-control';
import { event, EventEmitter } from '../../utils/event';
import { innerInputValidators } from '../../utils/validators';
import style from './textarea.css?inline';
import '../label';

/**
 * Allows user to provide multi-line text input
 *
 * @element dfx-textarea
 * @fires {string} dfx-input - Fires when value changed on keyup
 * @fires {string} dfx-change - Fires when value changed and textarea is blurred
 * @fires {ValidityState} dfx-invalid - Fires when value is invalid
 * @cssprop [--dfx-textarea-border-radius=var(--dfx-border-radius-m, 0.375rem)] - Border radius
 * @cssprop [--dfx-textarea-box-shadow=inset 0 0 0 var(--dfx-size-5xs, 0.0625rem) var(--dfx-color-background-border, #d4d4d8)] - Default box shadow
 * @cssprop [--dfx-textarea-box-shadow-active=inset 0 0 0 var(--dfx-size-5xs, 0.0625rem) var(--dfx-color-background-border-variant, #9ca3af)] - Active box shadow
 * @cssprop [--dfx-textarea-box-shadow-error=inset 0 0 0 var(--dfx-size-5xs, 0.0625rem) var(--dfx-color-danger-dark, #dc2626)] - Error box shadow
 * @cssprop [--dfx-textarea-color-background=var(--dfx-color-background-surface, #ffffff)] - Textarea background
 * @cssprop [--dfx-textarea-color-text=var(--dfx-color-text-dark, #1f2937)] - Textarea text color
 * @cssprop [--dfx-textarea-font-family=var(--dfx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif)] - Textarea font family
 * @cssprop [--dfx-textarea-font-size=var(--dfx-font-size-m, 0.875rem)] - Textarea font size
 * @cssprop [--dfx-textarea-gap=var(--dfx-size-2xs, 0.5rem)] - Gap between textarea and label
 * @cssprop [--dfx-textarea-height=auto] - Textarea height
 * @cssprop [--dfx-textarea-line-height=var(--dfx-line-height-m, 1.5)] - Textarea line height
 * @cssprop [--dfx-textarea-padding=var(--dfx-size-2xs, 0.5rem) var(--dfx-size-xs, 0.75rem)] - Textarea padding
 * @cssprop [--dfx-textarea-width=calc(var(--dfx-size-3xl, 2.5rem) * 5)] - Component width
 * @csspart textarea - Textarea element
 * @csspart container - Container element
 */
@customElement('dfx-textarea')
export class Textarea extends FormControlMixin(LitElement) {
  static styles = unsafeCSS(style);

  /** @ignore */
  static formControlValidators = innerInputValidators;

  /** @ignore */
  @query('textarea')
  validationTarget: HTMLTextAreaElement;

  /**
   * Sets name of textarea
   */
  @property({ type: String, reflect: true })
  name: string;

  /**
   * Sets value of textarea
   */
  @property({ type: String })
  value = '';

  /**
   * Sets label of textarea
   */
  @property({ type: String, reflect: true })
  label: string;

  /**
   * Sets visible row count of textarea
   */
  @property({ type: Number, reflect: true })
  rows = 3;

  /**
   * Sets placeholder of textarea
   */
  @property({ type: String, reflect: true })
  placeholder: string;

  /**
   * Sets textarea as required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Sets textarea validation of minimum length
   */
  @property({ type: Number, reflect: true })
  minlength: number;

  /**
   * Sets textarea validation of maximum length
   */
  @property({ type: Number, reflect: true })
  maxlength: number;

  /**
   * Sets textarea as disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets textarea as readonly
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Sets helper text of textarea
   */
  @property({ type: String, attribute: 'helper-text', reflect: true })
  helperText: string;

  /**
   * Hides label of textarea
   */
  @property({ type: Boolean, attribute: 'hide-label', reflect: true })
  hideLabel = false;

  /**
   * Enables spellcheck inside the textarea
   */
  @property({ type: Boolean, reflect: true })
  spellchecker = false;

  /**
   * Enables character counter
   */
  @property({ type: Boolean, attribute: 'character-counter', reflect: true })
  characterCounter = false;

  /**
   * Fires when value of textarea changed on keyup
   * @ignore
   */
  @event('dfx-input')
  private onInput: EventEmitter<string>;

  /**
   * Fires when value of textarea changed and textarea is blurred
   * @ignore
   */
  @event('dfx-change')
  private onChange: EventEmitter<string>;

  /**
   * Fires when value of textarea is invalid
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

  #handleChange(event: Event): void {
    this.dirty = true;
    this.value = (event.target as HTMLInputElement).value;
    this.onChange.emit(this.value);
  }

  #handleInput(event: Event): void {
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

  override resetFormControl(): void {
    this.dirty = false;
    this.value = this.getAttribute('value') ?? '';
  }

  render(): TemplateResult {
    const invalidMessage = html`<dfx-label type="error" id="label">
      ${this.validationMessage}
    </dfx-label>`;
    const helperMessage = this.helperText
      ? html`<dfx-label type="helper" id="label"> ${this.helperText} </dfx-label>`
      : nothing;
    const maxLength = html`/${this.maxlength}`;
    const characterCounter = html`<dfx-label
      type="${(this.maxlength && this.value.length > this.maxlength) ||
      (this.minlength && this.dirty && this.value.length < this.minlength)
        ? 'error'
        : 'helper'}"
      id="character-count"
    >
      ${this.value.length}${this.maxlength ? maxLength : nothing}
    </dfx-label>`;
    const label =
      this.label && !this.hideLabel ? html`<dfx-label> ${this.label} </dfx-label>` : nothing;
    const classes = {
      dirty: this.dirty,
      invalid: !this.checkValidity(),
    };

    return html`<label part="container" class=${classMap(classes)}>
      ${label}
      <textarea
        part="textarea"
        .value=${live(this.value)}
        rows="${this.rows}"
        placeholder="${this.placeholder ?? nothing}"
        minlength="${this.minlength ?? nothing}"
        maxlength="${this.maxlength ?? nothing}"
        ?required=${this.required}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        spellcheck="${this.spellchecker}"
        @change=${this.#handleChange}
        @input=${this.#handleInput}
        aria-label=${this.label && this.hideLabel ? this.label : nothing}
        aria-invalid=${this.checkValidity() ? 'false' : 'true'}
        aria-describedby=${this.helperText || (!this.checkValidity() && this.dirty)
          ? 'label'
          : nothing}
      ></textarea>
      <div class="description">
        ${!this.checkValidity() && this.dirty ? invalidMessage : helperMessage}
        ${this.characterCounter ? characterCounter : nothing}
      </div>
    </label>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-textarea': Textarea;
  }
}
