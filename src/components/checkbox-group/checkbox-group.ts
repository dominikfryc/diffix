import { LitElement, PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { FormControlMixin } from '@open-wc/form-control';
import { event, EventEmitter } from '../../utils/event.js';
import { groupRequiredValidator } from '../../utils/validators.js';
import { Checkbox } from '../checkbox/index.js';
import style from './checkbox-group.css?raw';
import '../label/index.js';

/**
 * Creates a form group of checkboxes or switches.
 *
 * @element dfx-checkbox-group
 * @slot {html} slot - Default slot for `<dfx-checkbox>` elements
 * @fires {string | null} dfx-change - Fires when value of checkbox group changes
 * @fires {ValidityState} dfx-invalid - Fires when state of checkbox group is invalid
 * @cssprop [--dfx-checkbox-group-direction=column] - Direction of checkboxes
 * @cssprop [--dfx-checkbox-group-gap=var(--dfx-size-2xs, 0.5rem)] - Gap between checkboxes
 * @csspart fieldset - Fieldset element
 * @csspart container - Container for checkboxes
 */
export class CheckboxGroup extends FormControlMixin(LitElement) {
  static styles = unsafeCSS(style);

  /** @ignore */
  static formControlValidators = [groupRequiredValidator];

  /**
   * Sets label of checkbox group
   */
  @property({ type: String, reflect: true })
  label: string;

  /**
   * Sets value of checkbox group (comma-separated string of values of checked options)
   */
  @property({ type: String })
  value: string | null = null;

  /**
   * Sets name of checkbox group (when set, it shows in form data)
   */
  @property({ type: String, reflect: true })
  name: string;

  /**
   * Sets checkbox group as required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Sets checkbox group as disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets helper text of input
   */
  @property({ type: String, attribute: 'helper-text', reflect: true })
  helperText: string;

  /**
   * Fires when value of checkbox group changes
   * @ignore
   */
  @event('dfx-change')
  private onChange: EventEmitter<string | null>;

  /**
   * Fires when state of checkbox group is invalid
   * @ignore
   */
  @event('dfx-invalid')
  private onInvalid: EventEmitter<ValidityState>;

  /**
   * Signals that value of checkbox group changed
   * @ignore
   */
  @state()
  private dirty = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('focus', this.#handleFocus);
    this.addEventListener('invalid', this.#handleInvalid);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focus', this.#handleFocus);
    this.removeEventListener('invalid', this.#handleInvalid);
  }

  #options(): Checkbox[] {
    return [...this.querySelectorAll('dfx-checkbox')];
  }

  #checkedOptions(): Checkbox[] {
    return this.#options().filter(option => option.checked);
  }

  #checkedOptionsValues(): string[] {
    return this.#checkedOptions().map(option => option.value);
  }

  #handleFocus(event: FocusEvent): void {
    if (event.relatedTarget !== this.#options()[0]) {
      this.#options()[0]?.focus();
    }
  }

  #handleInvalid(): void {
    this.dirty = true;
  }

  #handleOptionChange(event: CustomEvent<boolean>): void {
    this.dirty = true;
    this.value = this.#checkedOptionsValues().join(',') || null;
    this.onChange.emit(this.value);
    event.stopPropagation();
  }

  override validityCallback(): string {
    this.onInvalid.emit(this.internals.validity);
    return this.validationMessage;
  }

  override async updated(changedProperties: PropertyValues): Promise<void> {
    if (changedProperties.has('value') || changedProperties.has('required')) {
      this.setValue(this.value);
      await this.validationComplete;
      this.requestUpdate();
    }
    if (changedProperties.has('disabled')) {
      this.#options().forEach(option => (option.disabled = this.disabled));
    }
  }

  override resetFormControl(): void {
    this.dirty = false;
    this.value = this.getAttribute('value') || null;
  }

  override firstUpdated(): void {
    this.tabIndex = 0;
    this.#options().forEach(option => {
      this.value?.split(',').includes(option.value)
        ? option.setAttribute('checked', '')
        : option.removeAttribute('checked');
    });
  }

  #renderLabel(): TemplateResult {
    return html`<legend><dfx-label>${this.label}</dfx-label></legend>`;
  }

  #renderError(): TemplateResult {
    return html`<dfx-label type="error">${this.validationMessage}</dfx-label>`;
  }

  #renderHelper(): TemplateResult {
    return this.helperText ? html`<dfx-label type="helper">${this.helperText}</dfx-label>` : html``;
  }

  /** @ignore */
  get #showError(): boolean {
    return !this.validity.valid && this.dirty;
  }

  render(): TemplateResult {
    return html`
      <fieldset part="fieldset">
        ${this.label ? this.#renderLabel() : nothing}
        <div part="container" @dfx-change=${this.#handleOptionChange}>
          <slot></slot>
        </div>
        ${this.#showError ? this.#renderError() : this.#renderHelper()}
      </fieldset>
    `;
  }
}
