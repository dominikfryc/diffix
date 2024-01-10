import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { Button } from './button.js';

describe('Button', () => {
  it('is defined', () => {
    const el = document.createElement('dfx-button');

    expect(el).to.be.instanceOf(Button);
  });

  it('renders with default values', async () => {
    const el = await fixture<Button>(html` <dfx-button></dfx-button> `);

    expect(el.variant).to.equal('outlined');
    expect(el.theme).to.equal('neutral');
    expect(el.label).to.be.undefined;
    expect(el.disabled).to.be.false;
    expect(el.loading).to.be.false;
    expect(el.loadingText).to.be.undefined;
    expect(el.href).to.be.undefined;
    expect(el.target).to.be.undefined;
    expect(el.type).to.equal('button');
  });

  it('renders with custom attributes correctly', async () => {
    const label = 'Submit';
    const variant = 'filled';
    const theme = 'primary';
    const disabled = true;
    const loading = true;
    const loadingText = 'Loading...';
    const href = 'https://example.com';
    const target = '_blank';
    const type = 'submit';

    const el = await fixture<Button>(html`
      <dfx-button
        label=${label}
        variant=${variant}
        theme=${theme}
        ?disabled=${disabled}
        ?loading=${loading}
        loading-text=${loadingText}
        href=${href}
        target=${target}
        type=${type}
      ></dfx-button>
    `);

    expect(el.label).to.equal(label);
    expect(el.variant).to.equal(variant);
    expect(el.theme).to.equal(theme);
    expect(el.disabled).to.be.true;
    expect(el.loading).to.be.true;
    expect(el.loadingText).to.equal(loadingText);
    expect(el.href).to.equal(href);
    expect(el.target).to.equal(target);
    expect(el.type).to.equal(type);
  });

  it('fires dfx-click event when button is clicked', async () => {
    const el = await fixture<Button>(html` <dfx-button></dfx-button> `);
    const button = el.shadowRoot?.querySelector('button');

    setTimeout(() => button?.click());
    const ev = await oneEvent(el, 'dfx-click', false);

    expect(ev).to.exist;
    expect(ev.detail.type).to.equal('click');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<Button>(html` <dfx-button>Button</dfx-button> `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
