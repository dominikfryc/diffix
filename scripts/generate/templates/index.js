const globalIndexTemplate = component =>
  `export { ${component.name} } from './components/${component.tag}';`;
const componentIndexTemplate = component =>
  `export { ${component.name} } from './${component.tag}';\n`;
export { globalIndexTemplate, componentIndexTemplate };
