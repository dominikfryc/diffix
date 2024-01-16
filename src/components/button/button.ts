import { LitElement, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { event, EventEmitter } from '../../utils/event.js';
import style from './button.css?raw';
import '../spinner/spinner.js';

/**
 * Clickable element used to perform an action.
 *
 * @element dfx-button
 * @slot {html} slot - Default slot for button content
 * @slot {html} start - Optional slot for content before button content
 * @slot {html} end - Optional slot for content after button content
 * @fires {Event} dfx-click - Fires when button is clicked
 * @cssprop [--dfx-button-border-radius=var(--dfx-border-radius-m, 0.375rem)] - Border radius
 * @cssprop [--dfx-button-color-text=var(--dfx-button-color-dark)] - Text color
 * @cssprop [--dfx-button-color-background=var(--dfx-color-background-light, #ffffff)] - Background color
 * @cssprop [--dfx-button-color-background-hover=var(--dfx-button-color-light)] - Background color on hover
 * @cssprop [--dfx-button-color-dark=var(--dfx-color-neutral-dark, #4f5661)] - Dark color
 * @cssprop [--dfx-button-color-dark-variant=var(--dfx-color-neutral-dark-variant, #383d46)] - Dark variant color
 * @cssprop [--dfx-button-color-light=var(--dfx-color-neutral-light, #7e87951a)] - Light color
 * @cssprop [--dfx-button-color-light-variant=var(--dfx-color-neutral-light-variant, #7e879533)] - Light variant color
 * @cssprop [--dfx-button-focus-offset=var(--dfx-form-outline-offset, 0.2rem)] - Focus offset
 * @cssprop [--dfx-button-font-family=var(--dfx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif)] - Font family
 * @cssprop [--dfx-button-font-size=var(--dfx-font-size-m, 0.875rem)] - Font size
 * @cssprop [--dfx-button-font-weight=var(--dfx-font-weight-semibold, 600)] - Font weight
 * @cssprop [--dfx-button-gap=var(--dfx-size-2xs, 0.5rem)] - Gap between slots
 * @cssprop [--dfx-button-height=calc(var(--dfx-button-line-height) + 2 * var(--dfx-button-padding))] - Height
 * @cssprop [--dfx-button-icon-size=var(--dfx-button-line-height)] - Icon size
 * @cssprop [--dfx-button-line-height=var(--dfx-size-l, 1.25rem)] - Line height
 * @cssprop [--dfx-button-padding=var(--dfx-size-2xs, 0.5rem)] - Padding
 * @cssprop [--dfx-button-scale-active=0.95] - Scale factor on active
 * @cssprop [--dfx-button-shadow=inset 0 0 0 var(--dfx-size-5xs, 0.0625rem) var(--dfx-color-border-dark, #979fab)] - Outline shadow
 * @cssprop [--dfx-button-transition=all var(--dfx-transition-medium, 0.2s ease-in-out)] - Transition
 * @csspart button - Button element
 */
@customElement('dfx-button')
export class Button extends LitElement {
  static styles = unsafeCSS(style);

  /**
   * Sets variant of button
   */
  @property({ type: String, reflect: true })
  variant: 'filled' | 'tonal' | 'outlined' | 'text' = 'outlined';

  /**
   * Sets theme of button
   */
  @property({ type: String, reflect: true })
  theme: 'primary' | 'neutral' | 'success' | 'danger' = 'neutral';

  /**
   * Sets label of button (used for accessibility with icon only)
   */
  @property({ type: String })
  label: string;

  /**
   * Sets disabled state of button
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets loading state of button
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Sets label for loading state of button (used when `loading` is set)
   */
  @property({ type: String, attribute: 'loading-text' })
  loadingText: string;

  /**
   * Sets URL of link (when set it renders as `<a>` instead of `<button>`)
   */
  @property({ type: String })
  href: string;

  /**
   * Sets anchor target of link (used when `href` is set)
   */
  @property({ type: String })
  target: string;

  /**
   * Sets type of button (when used with form)
   */
  @property({ type: String })
  type: 'button' | 'reset' | 'submit' = 'button';

  /**
   * Fires when button is clicked
   * @ignore
   */
  @event('dfx-click')
  private onClick: EventEmitter<Event>;

  #handleClick(event: Event): void {
    if (this.type !== 'button') {
      const form = this.closest('form') as HTMLFormElement;

      if (this.type === 'reset') {
        form.reset();
      }
      if (this.type === 'submit') {
        form.requestSubmit();
      }
    }

    this.onClick.emit(event);
  }

  #renderDefaultSlot(): TemplateResult {
    return html`<slot></slot>`;
  }

  #renderSlots(): TemplateResult {
    return html`<slot name="start"></slot> ${this.#renderDefaultSlot()} <slot name="end"></slot>`;
  }

  #renderSpinner(): TemplateResult {
    return html`
      <div class=${this.loadingText !== '' ? 'spinner-start' : 'spinner-only'}>
        <dfx-spinner size="small" aria-hidden="true"></dfx-spinner>
      </div>
    `;
  }

  #renderLoadingContent(): TemplateResult {
    return html`
      ${this.#renderSpinner()}
      ${this.loadingText !== undefined ? this.loadingText : this.#renderDefaultSlot()}
    `;
  }

  render(): TemplateResult {
    return this.href
      ? html`
          <a
            part="button"
            role="button"
            href=${this.href!}
            target=${this.target ?? nothing}
            rel=${this.target ? 'noreferrer noopener' : nothing}
            aria-label=${this.label ?? nothing}
            aria-disabled=${(this.disabled || this.loading) ?? nothing}
          >
            ${this.loading ? this.#renderLoadingContent() : this.#renderSlots()}
          </a>
        `
      : html`
          <button
            part="button"
            ?disabled=${this.disabled || this.loading}
            @click=${this.#handleClick}
            aria-label=${this.label ?? nothing}
            aria-disabled=${(this.disabled || this.loading) ?? nothing}
          >
            ${this.loading ? this.#renderLoadingContent() : this.#renderSlots()}
          </button>
        `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-button': Button;
  }
}
