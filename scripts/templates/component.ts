import { Component } from '../generate.js';

export const componentTemplate = (component: Component): string =>
  `import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import style from './${component.tag}.css?raw';

/**
 * Component description
 *
 * @element dfx-${component.tag}
 */
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
}\n`;
