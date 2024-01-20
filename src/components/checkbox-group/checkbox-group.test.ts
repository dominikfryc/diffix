import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { CheckboxGroup } from './index.js';
import '../checkbox/index.js';

describe('CheckboxGroup', () => {
  it('is defined', () => {
    const el = document.createElement('dfx-checkbox-group');

    expect(el).to.be.instanceOf(CheckboxGroup);
  });

  it('renders with default values', async () => {
    const el = await fixture<CheckboxGroup>(html` <dfx-checkbox-group></dfx-checkbox-group> `);

    expect(el.label).to.be.undefined;
    expect(el.value).to.be.null;
    expect(el.name).to.be.undefined;
    expect(el.required).to.be.false;
    expect(el.disabled).to.be.false;
    expect(el.helperText).to.be.undefined;
  });

  it('renders with custom attributes correctly', async () => {
    const label = 'Label';
    const value = '1';
    const name = 'options';
    const required = true;
    const disabled = true;
    const helperText = 'Helper text';

    const el = await fixture<CheckboxGroup>(html`
      <dfx-checkbox-group
        label=${label}
        value=${value}
        name=${name}
        ?required=${required}
        ?disabled=${disabled}
        helper-text=${helperText}
      ></dfx-checkbox-group>
    `);

    expect(el.label).to.equal(label);
    expect(el.value).to.equal(value);
    expect(el.name).to.equal(name);
    expect(el.required).to.equal(required);
    expect(el.disabled).to.equal(disabled);
    expect(el.helperText).to.equal(helperText);
  });

  it('fires dfx-change event on change', async () => {
    const value = 'value';
    const el = await fixture<CheckboxGroup>(html`
      <dfx-checkbox-group label="Checkbox group label">
        <dfx-checkbox value=${value}>Label</dfx-checkbox>
      </dfx-checkbox-group>
    `);
    const checkbox = el.querySelector('dfx-checkbox');
    const input = checkbox?.shadowRoot?.querySelector('input');

    setTimeout(() => input?.click());
    const ev = await oneEvent(el, 'dfx-change', false);

    expect(ev).to.exist;
    expect(ev.detail).to.equal(value);
  });

  it('fires dfx-invalid event on invalid', async () => {
    const el = await fixture<CheckboxGroup>(html`
      <dfx-checkbox-group label="Checkbox group label" required>
        <dfx-checkbox value="value">Label</dfx-checkbox>
      </dfx-checkbox-group>
    `);
    const checkbox = el.querySelector('dfx-checkbox');
    const input = checkbox?.shadowRoot?.querySelector('input');

    setTimeout(() => input?.click());
    setTimeout(() => input?.click());
    const ev = await oneEvent(el, 'dfx-invalid', false);

    expect(ev).to.exist;
    expect(ev.detail.valid).to.be.false;
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<CheckboxGroup>(html`
      <dfx-checkbox-group label="Checkbox group label"></dfx-checkbox-group>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
