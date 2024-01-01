import { Component } from '../generate';

const componentTemplate = (component: Component): string => {
  return `import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import style from './${component.tag}.css?inline';

/**
 * Component description
 *
 * @element dfx-${component.tag}
 */
@customElement('dfx-${component.tag}')
export class ${component.name} extends LitElement {
  static styles = unsafeCSS(style);

  /**
   * Sets property value
   */
  @property({ type: String, reflect: true })
  property: string;

  render(): TemplateResult {
    return html\`${component.name}\`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-${component.tag}': ${component.name};
  }
}\n`;
};
export { componentTemplate };
