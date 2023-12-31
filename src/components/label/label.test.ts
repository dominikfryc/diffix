import { html, fixture, expect } from '@open-wc/testing';
import { Label } from './label';

describe('Label', () => {
  it('is defined', () => {
    const el = document.createElement('dfx-label');

    expect(el).to.be.instanceOf(Label);
  });

  it('renders with default values', async () => {
    const el = await fixture<Label>(html` <dfx-label></dfx-label> `);

    expect(el.type).to.equal('control');
  });

  it('renders with custom attributes correctly', async () => {
    const type = 'error';

    const el = await fixture<Label>(html` <dfx-label type=${type}></dfx-label> `);

    expect(el.type).to.equal(type);
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<Label>(html` <dfx-label>Label</dfx-label> `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
