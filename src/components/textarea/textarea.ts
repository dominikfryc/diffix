import { LitElement, PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { FormControlMixin } from '@open-wc/form-control';
import { event, EventEmitter } from '../../utils/event.js';
import { innerInputValidators } from '../../utils/validators.js';
import style from './textarea.css?raw';
import '../label/index.js';

/**
 * Allows user to provide multi-line text input
 *
 * @element dfx-textarea
 * @fires {string} dfx-input - Fires when value changed on keyup
 * @fires {string} dfx-change - Fires when value changed and textarea is blurred
 * @fires {ValidityState} dfx-invalid - Fires when value is invalid
 * @cssprop [--dfx-textarea-border-radius=var(--dfx-border-radius-m, 0.375rem)] - Border radius
 * @cssprop [--dfx-textarea-box-shadow=inset 0 0 0 var(--dfx-size-5xs, 0.0625rem) var(--dfx-color-background-border, #aeb5bf)] - Default box shadow
 * @cssprop [--dfx-textarea-box-shadow-active=inset 0 0 0 var(--dfx-size-5xs, 0.0625rem) var(--dfx-color-background-border-variant, #7e8795)] - Active box shadow
 * @cssprop [--dfx-textarea-box-shadow-error=inset 0 0 0 var(--dfx-size-5xs, 0.0625rem) var(--dfx-color-danger-dark, #c91f3a)] - Error box shadow
 * @cssprop [--dfx-textarea-color-background=var(--dfx-color-background-surface, #ffffff)] - Textarea background
 * @cssprop [--dfx-textarea-color-text=var(--dfx-color-text-dark, #383d46)] - Textarea text color
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

  /**
   * Signals that value of input changed
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

  #handleInput(event: Event & { target: HTMLInputElement }): void {
    this.value = event.target.value;
    this.onInput.emit(this.value);
  }

  #handleChange(event: Event & { target: HTMLInputElement }): void {
    this.dirty = true;
    this.value = event.target.value;
    this.onChange.emit(this.value);
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

  #renderLabel(): TemplateResult {
    return html`<label for=${this.#id}><dfx-label>${this.label}</dfx-label></label>`;
  }

  #renderCharacterCounter(): TemplateResult {
    return html`
      <dfx-label type=${this.#showError ? 'error' : 'helper'} id="character-count">
        ${this.value.length}${this.maxlength ? '/' + this.maxlength : nothing}
      </dfx-label>
    `;
  }

  /** @ignore */
  get #showError(): boolean {
    return !this.validity.valid && this.dirty;
  }

  /** @ignore */
  #id = Math.random().toString(36).substring(2);

  render(): TemplateResult {
    return html`
      <div part="container" class=${this.#showError ? 'invalid' : nothing}>
        ${this.label && !this.hideLabel ? this.#renderLabel() : nothing}
        <textarea
          id=${this.#id}
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
          aria-invalid=${this.#showError}
          aria-describedby=${this.helperText || this.#showError ? 'label' : nothing}
        ></textarea>
        <div class="description">
          ${this.#showError ? this.#renderError() : this.#renderHelper()}
          ${this.characterCounter ? this.#renderCharacterCounter() : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-textarea': Textarea;
  }
}
