import { html, fixture, expect } from '@open-wc/testing';
import { Spinner } from './spinner';

describe('Spinner', () => {
  it('is defined', () => {
    const el = document.createElement('dfx-spinner');

    expect(el).to.be.instanceOf(Spinner);
  });

  it('renders with default values', async () => {
    const el = await fixture<Spinner>(html` <dfx-spinner></dfx-spinner> `);

    expect(el.size).to.equal('medium');
    expect(el.label).to.be.undefined;
  });

  it('renders with custom attributes correctly', async () => {
    const size = 'small';
    const label = 'label';

    const el = await fixture<Spinner>(html`
      <dfx-spinner size=${size} label=${label}></dfx-spinner>
    `);

    expect(el.size).to.equal(size);
    expect(el.label).to.equal(label);
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<Spinner>(html` <dfx-spinner label="Label"></dfx-spinner> `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
