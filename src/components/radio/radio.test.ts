import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { Radio } from './radio.js';

describe('Radio', () => {
  it('is defined', () => {
    const el = document.createElement('dfx-radio');

    expect(el).to.be.instanceOf(Radio);
  });

  it('renders with default values', async () => {
    const el = await fixture<Radio>(html` <dfx-radio></dfx-radio> `);

    expect(el.checked).to.be.false;
    expect(el.value).to.be.undefined;
    expect(el.disabled).to.be.false;
    expect(el.helperText).to.be.undefined;
  });

  it('renders with custom attributes correctly', async () => {
    const checked = true;
    const value = 'value';
    const disabled = true;
    const helperText = 'Helper text';

    const el = await fixture<Radio>(html`
      <dfx-radio
        ?checked=${checked}
        value=${value}
        ?disabled=${disabled}
        helper-text=${helperText}
      ></dfx-radio>
    `);

    expect(el.checked).to.equal(checked);
    expect(el.value).to.equal(value);
    expect(el.disabled).to.equal(disabled);
    expect(el.helperText).to.equal(helperText);
  });

  it('fires dfx-change event on change', async () => {
    const el = await fixture<Radio>(html` <dfx-radio></dfx-radio> `);
    const input = el.shadowRoot?.querySelector('input');

    setTimeout(() => input?.click());
    const ev = await oneEvent(el, 'dfx-change', false);

    expect(ev).to.exist;
    expect(ev.detail).to.equal(true);
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<Radio>(html` <dfx-radio>Label</dfx-radio> `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
