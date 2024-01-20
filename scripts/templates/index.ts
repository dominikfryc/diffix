import { Component } from '../generate.js';

export const globalIndexTemplate = (component: Component): string =>
  `export { ${component.name} } from './components/${component.tag}/index.js';`;

export const componentIndexTemplate = (component: Component): string =>
  `import { ${component.name} } from './${component.tag}.js';

if (!customElements.get('dfx-${component.tag}')) {
  customElements.define('dfx-${component.tag}', ${component.name});
}

declare global {
  interface HTMLElementTagNameMap {
    'dfx-${component.tag}': ${component.name};
  }
}

export { ${component.name} };\n`;
