import { LitElement, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { event, EventEmitter } from '../../utils/event.js';
import style from './alert.css?raw';
import questionIcon from '../../assets/question-circle.svg?raw';
import informationIcon from '../../assets/information-circle.svg?raw';
import checkIcon from '../../assets/check-circle.svg?raw';
import closeCircleIcon from '../../assets/close-circle.svg?raw';
import closeIcon from '../../assets/close.svg?raw';
import '../button/index.js';

/**
 * Informs user about important change or result of an operation.
 *
 * @element dfx-alert
 * @slot {html} slot - Default slot for content
 * @slot {html} icon - Slot for icon
 * @fires {Event} dfx-close - Fires when close button is clicked
 * @cssprop [--dfx-alert-border-radius=var(--dfx-border-radius-l, 0.5rem)] - Border radius
 * @cssprop [--dfx-alert-box-shadow=inset 0 0 0 var(--dfx-size-5xs, 0.0625rem) var(--dfx-alert-color-light-variant)] - Box shadow
 * @cssprop [--dfx-alert-color-dark=var(--dfx-color-neutral-dark, #4f5661)] - Dark color
 * @cssprop [--dfx-alert-color-dark-variant=var(--dfx-color-neutral-dark-variant, #383d46)] - Dark variant color
 * @cssprop [--dfx-alert-color-light=var(--dfx-color-neutral-light, #7e87951a)] - Light color
 * @cssprop [--dfx-alert-color-light-variant=var(--dfx-color-neutral-light-variant, #7e879533)] - Light variant color
 * @cssprop [--dfx-alert-color-icon=var(--dfx-alert-color-dark)] - Icon color
 * @cssprop [--dfx-alert-color-background=var(--dfx-alert-color-light)] - Background color
 * @cssprop [--dfx-alert-font-family=var(--dfx-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif)] - Font family
 * @cssprop [--dfx-alert-font-size=var(--dfx-font-size-m, 0.875rem)] - Font size
 * @cssprop [--dfx-alert-gap=var(--dfx-size-xs, 0.75rem)] - Gap between content
 * @cssprop [--dfx-alert-line-height=var(--dfx-line-height-m, 1.5)] - Line height
 * @cssprop [--dfx-alert-icon-size=calc(var(--dfx-alert-line-height) * var(--dfx-alert-font-size))] - Icon size
 * @cssprop [--dfx-alert-padding=var(--dfx-size-m, 1rem)] - Padding
 * @csspart alert - Alert element
 * @csspart close-button - Close button element
 * @csspart icon-slot - Icon element
 * @csspart content - Default slot
 */
export class Alert extends LitElement {
  static styles = unsafeCSS(style);

  /**
   * Renders close button (when clicked, alert is `closed`)
   */
  @property({ type: Boolean, reflect: true })
  closable = false;

  /**
   * Hides the alert
   */
  @property({ type: Boolean, reflect: true })
  hidden = false;

  /**
   * Sets theme of alert
   */
  @property({ type: String, reflect: true })
  theme: 'primary' | 'neutral' | 'success' | 'danger' = 'neutral';

  /**
   * Hides icon of alert
   */
  @property({ type: Boolean, attribute: 'hide-icon' })
  hideIcon = false;

  /**
   * Fires when close button is clicked
   * @ignore
   */
  @event('dfx-close')
  private onClose: EventEmitter<Event>;

  #handleClick(event: Event): void {
    this.hidden = true;
    this.onClose.emit(event);
  }

  #renderCloseButton(): TemplateResult {
    return html`
      <dfx-button
        part="close-button"
        label="Close alert"
        variant="text"
        @click=${this.#handleClick}
      >
        ${unsafeSVG(closeIcon)}
      </dfx-button>
    `;
  }

  #renderIcon(): TemplateResult {
    let icon = questionIcon;
    switch (this.theme) {
      case 'primary':
        icon = informationIcon;
        break;
      case 'success':
        icon = checkIcon;
        break;
      case 'danger':
        icon = closeCircleIcon;
        break;
    }
    return html`
      <div part="icon-slot">
        <slot name="icon">${unsafeSVG(icon)}</slot>
      </div>
    `;
  }

  render(): TemplateResult {
    return html`
      <div role="alert" part="alert">
        ${!this.hideIcon ? this.#renderIcon() : nothing}
        <div part="content">
          <slot></slot>
        </div>
        ${this.closable ? this.#renderCloseButton() : nothing}
      </div>
    `;
  }
}
