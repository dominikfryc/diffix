import { Component } from '../generate.js';

const globalIndexTemplate = (component: Component): string =>
  `export { ${component.name} } from './components/${component.tag}';`;
const componentIndexTemplate = (component: Component): string =>
  `export { ${component.name} } from './${component.tag}';\n`;
export { globalIndexTemplate, componentIndexTemplate };
