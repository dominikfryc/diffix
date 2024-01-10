import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { Checkbox } from './checkbox.js';

describe('Checkbox', () => {
  it('is defined', () => {
    const el = document.createElement('dfx-checkbox');

    expect(el).to.be.instanceOf(Checkbox);
  });

  it('renders with default values', async () => {
    const el = await fixture<Checkbox>(html` <dfx-checkbox></dfx-checkbox> `);

    expect(el.checked).to.be.false;
    expect(el.name).to.be.undefined;
    expect(el.value).to.be.undefined;
    expect(el.type).to.equal('checkbox');
    expect(el.required).to.be.false;
    expect(el.disabled).to.be.false;
    expect(el.helperText).to.be.undefined;
  });

  it('renders with custom attributes correctly', async () => {
    const checked = true;
    const name = 'name';
    const value = 'value';
    const type = 'switch';
    const required = true;
    const disabled = true;
    const helperText = 'Helper text';

    const el = await fixture<Checkbox>(html`
      <dfx-checkbox
        ?checked=${checked}
        name=${name}
        value=${value}
        type=${type}
        ?required=${required}
        ?disabled=${disabled}
        helper-text=${helperText}
      ></dfx-checkbox>
    `);

    expect(el.checked).to.equal(checked);
    expect(el.name).to.equal(name);
    expect(el.value).to.equal(value);
    expect(el.type).to.equal(type);
    expect(el.required).to.equal(required);
    expect(el.disabled).to.equal(disabled);
    expect(el.helperText).to.equal(helperText);
  });

  it('fires dfx-change event on change', async () => {
    const el = await fixture<Checkbox>(html` <dfx-checkbox></dfx-checkbox> `);
    const input = el.shadowRoot?.querySelector('input');

    setTimeout(() => input?.click());
    const ev = await oneEvent(el, 'dfx-change', false);

    expect(ev).to.exist;
    expect(ev.detail).to.equal(true);
  });

  it('fires dfx-invalid event on invalid', async () => {
    const el = await fixture<Checkbox>(html` <dfx-checkbox required></dfx-checkbox> `);
    const input = el.shadowRoot?.querySelector('input');

    setTimeout(() => {
      input?.click();
      input?.click();
    });
    const ev = await oneEvent(el, 'dfx-invalid', false);

    expect(ev).to.exist;
    expect(ev.detail.valid).to.be.false;
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<Checkbox>(html` <dfx-checkbox>Label</dfx-checkbox> `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
