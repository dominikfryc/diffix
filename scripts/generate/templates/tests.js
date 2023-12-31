const testTemplate = component => `import { html, fixture, expect } from '@open-wc/testing';
import { ${component.name} } from './${component.tag}';

describe('${component.name}', () => {
  it('is defined', () => {
    const el = document.createElement('dfx-${component.tag}');

    expect(el).to.be.instanceOf(${component.name});
  });

  it('renders with default values', async () => {
    const el = await fixture<${component.name}>(html\` <dfx-${component.tag}></dfx-${component.tag}> \`);

    expect(el.property).to.be.undefined;
  });

  it('renders with custom attributes correctly', async () => {
    const property = 'property';

    const el = await fixture<${component.name}>(html\` <dfx-${component.tag} property=\${property}></dfx-${component.tag}> \`);

    expect(el.property).to.equal(property);
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<${component.name}>(html\` <dfx-${component.tag}></dfx-${component.tag}> \`);

    await expect(el).shadowDom.to.be.accessible();
  });
});\n`;
export { testTemplate };
