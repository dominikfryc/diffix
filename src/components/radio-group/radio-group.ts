import { LitElement, PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FormControlMixin } from '@open-wc/form-control';
import { event, EventEmitter } from '../../utils/event';
import { groupRequiredValidator } from '../../utils/validators';
import { Radio } from '../radio';
import style from './radio-group.css?inline';
import '../label';

/**
 * Creates a form group of radios
 *
 * @element dfx-radio-group
 * @slot {html} slot - Default slot for `<dfx-radio>` elements
 * @fires {string | null} dfx-change - Fires when value of radio group changes
 * @fires {ValidityState} dfx-invalid - Fires when state of radio group is invalid
 * @cssprop [--dfx-checkbox-group-direction=column] - Direction of radios
 * @cssprop [--dfx-checkbox-group-gap=var(--dfx-size-2xs, 0.5rem)] - Gap between radios
 * @csspart fieldset - Fieldset element
 * @csspart container - Container for checkboxes
 */
@customElement('dfx-radio-group')
export class RadioGroup extends FormControlMixin(LitElement) {
  static styles = unsafeCSS(style);

  /** @ignore */
  static formControlValidators = [groupRequiredValidator];

  /**
   * Sets label of radio group
   */
  @property({ type: String, reflect: true })
  label: string;

  /**
   * Sets value of radio group (string of value of checked option)
   */
  @property({ type: String })
  value: string | null = null;

  /**
   * Sets name of radio group (when set, it shows in form data)
   */
  @property({ type: String, reflect: true })
  name: string;

  /**
   * Sets radio group as required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Sets radio group as disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Fires when value of radio group changes
   * @ignore
   */
  @event('dfx-change')
  private onChange: EventEmitter<string | null>;

  /**
   * Fires when state of radio group is invalid
   * @ignore
   */
  @event('dfx-invalid')
  private onInvalid: EventEmitter<ValidityState>;

  /** @ignore */
  @state()
  private dirty = false;

  /** @ignore */
  @state()
  private focusedOptionIndex = 0;

  #options(): Radio[] {
    return [...this.querySelectorAll('dfx-radio')];
  }

  #checkedOptions(): Radio[] {
    return this.#options().filter(option => option.checked);
  }

  #checkedOptionsValues(): string[] {
    return this.#checkedOptions().map(option => option.value);
  }

  #availableOptions(): Radio[] {
    return this.#options().filter(option => !option.disabled);
  }

  #focusedOption(): Radio | undefined {
    return this.#availableOptions()[this.focusedOptionIndex];
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.#resetFocusedOptionIndex();
    this.addEventListener('focus', this.#handleFocus);
    this.addEventListener('keydown', this.#handleKeyDown);
    this.form?.addEventListener('submit', () => {
      this.reportValidity();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focus', this.#handleFocus);
    this.removeEventListener('keydown', this.#handleKeyDown);
  }

  /** @ignore */
  #handleFocus = (event: FocusEvent): void => {
    if (event.relatedTarget !== this.#focusedOption()) {
      this.#focusedOption()?.focus();
    }
  };

  /** @ignore */
  #handleKeyDown = (event: KeyboardEvent) => {
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) {
      this.focusedOptionIndex++;
    } else if (['ArrowUp', 'ArrowLeft'].includes(event.key)) {
      this.focusedOptionIndex--;
    } else {
      return;
    }

    if (this.focusedOptionIndex < 0) {
      this.focusedOptionIndex = this.#availableOptions().length - 1;
    } else if (this.focusedOptionIndex > this.#availableOptions().length - 1) {
      this.focusedOptionIndex = 0;
    }

    if (this.#focusedOption()) {
      this.#focusedOption()!.focus();
      this.#setChecked(this.#focusedOption()!.value);
      this.value = this.#checkedOptionsValues().join(',') || null;
    }

    event.preventDefault();
  };

  #handleOptionChange(event: CustomEvent<boolean>): void {
    this.dirty = true;
    if (event.detail) {
      this.#setChecked((event.target as Radio).value);
      this.focusedOptionIndex = this.#availableOptions().indexOf(event.target as Radio);
    }
    this.value = this.#checkedOptionsValues().join(',') || null;
    this.onChange.emit(this.value);
    event.stopPropagation();
  }

  protected async updated(changedProperties: PropertyValues): Promise<void> {
    if (changedProperties.has('value') || changedProperties.has('required')) {
      this.setValue(this.value);
      await this.validationComplete;
      this.requestUpdate();
    }
    if (changedProperties.has('disabled')) {
      this.#options().forEach(option => (option.disabled = this.disabled));
    }
  }

  validityCallback(): string | void {
    this.onInvalid.emit(this.internals.validity);
    return this.validationMessage;
  }

  reportValidity(): boolean {
    this.dirty = true;
    return this.checkValidity();
  }

  #setChecked(value: string) {
    this.#options().forEach(option => (option.checked = option.value === value));
  }

  #resetFocusedOptionIndex(): void {
    this.focusedOptionIndex =
      this.value && this.#availableOptions().length
        ? this.#availableOptions().indexOf(
            this.#availableOptions().filter(option => option.value === this.value)[0],
          )
        : 0;
  }

  formResetCallback(): void {
    this.dirty = false;
    this.value = this.getAttribute('value') || null;
    this.#resetFocusedOptionIndex();
  }

  protected firstUpdated(): void {
    this.tabIndex = 0;
    this.#options().forEach(option => {
      this.value?.split(',').includes(option.value)
        ? option.setAttribute('checked', '')
        : option.removeAttribute('checked');
    });
  }

  render(): TemplateResult {
    const labelText = this.label
      ? html`<legend><dfx-label>${this.label}</dfx-label></legend>`
      : nothing;
    const invalidMessage = html`<dfx-label type="error">${this.validationMessage}</dfx-label>`;
    const classes = {
      dirty: this.dirty,
      invalid: !this.checkValidity(),
    };

    return html`<fieldset part="fieldset" class=${classMap(classes)}>
      ${labelText}
      <div part="container" @dfx-change=${this.#handleOptionChange}>
        <slot></slot>
      </div>
      ${!this.checkValidity() && this.dirty ? invalidMessage : nothing}
    </fieldset>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-radio-group': RadioGroup;
  }
}
