import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { Input } from './input';

describe('Input', () => {
  it('is defined', () => {
    const el = document.createElement('dfx-input');

    expect(el).to.be.instanceOf(Input);
  });

  it('renders with default values', async () => {
    const el = await fixture<Input>(html` <dfx-input></dfx-input> `);

    expect(el.name).to.be.undefined;
    expect(el.type).to.equal('text');
    expect(el.label).to.be.undefined;
    expect(el.placeholder).to.be.undefined;
    expect(el.value).to.equal('');
    expect(el.required).to.be.false;
    expect(el.minlength).to.be.undefined;
    expect(el.maxlength).to.be.undefined;
    expect(el.min).to.be.undefined;
    expect(el.max).to.be.undefined;
    expect(el.step).to.be.undefined;
    expect(el.pattern).to.be.undefined;
    expect(el.autocomplete).to.be.undefined;
    expect(el.disabled).to.be.false;
    expect(el.loading).to.be.false;
    expect(el.readonly).to.be.false;
    expect(el.inputmode).to.be.undefined;
    expect(el.helperText).to.be.undefined;
    expect(el.hideLabel).to.be.false;
  });

  it('renders with custom attributes correctly', async () => {
    const name = 'text';
    const type = 'number';
    const label = 'Label';
    const placeholder = '0';
    const value = '0';
    const required = true;
    const minlength = 0;
    const maxlength = 1;
    const min = 0;
    const max = 1;
    const step = 1;
    const pattern = '^(0|[1-9][0-9]*)$';
    const autocomplete = 'number';
    const disabled = true;
    const loading = true;
    const readonly = true;
    const inputmode = 'numeric';
    const helperText = 'Helper text';
    const hideLabel = true;

    const el = await fixture<Input>(html`
      <dfx-input
        name=${name}
        type=${type}
        label=${label}
        placeholder=${placeholder}
        value=${value}
        ?required=${required}
        minlength=${minlength}
        maxlength=${maxlength}
        min=${min}
        max=${max}
        step=${step}
        pattern=${pattern}
        autocomplete=${autocomplete}
        ?disabled=${disabled}
        ?loading=${loading}
        ?readonly=${readonly}
        inputmode=${inputmode}
        helper-text=${helperText}
        ?hide-label=${hideLabel}
      ></dfx-input>
    `);

    expect(el.name).to.equal(name);
    expect(el.type).to.equal(type);
    expect(el.label).to.equal(label);
    expect(el.placeholder).to.equal(placeholder);
    expect(el.value).to.equal(value);
    expect(el.required).to.equal(required);
    expect(el.minlength).to.equal(minlength);
    expect(el.maxlength).to.equal(maxlength);
    expect(el.min).to.equal(min);
    expect(el.max).to.equal(max);
    expect(el.step).to.equal(step);
    expect(el.pattern).to.equal(pattern);
    expect(el.autocomplete).to.equal(autocomplete);
    expect(el.disabled).to.equal(disabled);
    expect(el.loading).to.equal(loading);
    expect(el.readonly).to.equal(readonly);
    expect(el.inputmode).to.equal(inputmode);
    expect(el.helperText).to.equal(helperText);
    expect(el.hideLabel).to.equal(hideLabel);
  });

  it('fires dfx-input event on input', async () => {
    const el = await fixture<Input>(html` <dfx-input></dfx-input> `);
    const input = el.shadowRoot?.querySelector('input');

    setTimeout(() => {
      if (input) {
        input.value = 'value';
        input.dispatchEvent(new Event('input'));
      }
    });
    const ev = await oneEvent(el, 'dfx-input', false);

    expect(ev).to.exist;
    expect(ev.detail).to.equal('value');
  });

  it('fires dfx-change event on change', async () => {
    const el = await fixture<Input>(html` <dfx-input></dfx-input> `);
    const input = el.shadowRoot?.querySelector('input');

    setTimeout(() => {
      if (input) {
        input.value = 'value';
        input.dispatchEvent(new Event('change'));
      }
    });
    const ev = await oneEvent(el, 'dfx-change', false);

    expect(ev).to.exist;
    expect(ev.detail).to.equal('value');
  });

  it('fires dfx-invalid event on invalid', async () => {
    const el = await fixture<Input>(html` <dfx-input value="value" required></dfx-input> `);
    const input = el.shadowRoot?.querySelector('input');

    setTimeout(() => {
      if (input) {
        input.value = '';
        input.dispatchEvent(new Event('change'));
      }
    });
    const ev = await oneEvent(el, 'dfx-invalid', false);

    expect(ev).to.exist;
    expect(ev.detail.valid).to.be.false;
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<Input>(html` <dfx-input label="Label"></dfx-input> `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
