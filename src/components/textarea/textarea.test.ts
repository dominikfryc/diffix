import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { Textarea } from './textarea.js';

describe('Textarea', () => {
  it('is defined', () => {
    const el = document.createElement('dfx-textarea');

    expect(el).to.be.instanceOf(Textarea);
  });

  it('renders with default values', async () => {
    const el = await fixture<Textarea>(html` <dfx-textarea></dfx-textarea> `);

    expect(el.name).to.be.undefined;
    expect(el.value).to.equal('');
    expect(el.label).to.be.undefined;
    expect(el.rows).to.equal(3);
    expect(el.placeholder).to.be.undefined;
    expect(el.required).to.be.false;
    expect(el.minlength).to.be.undefined;
    expect(el.maxlength).to.be.undefined;
    expect(el.disabled).to.be.false;
    expect(el.readonly).to.be.false;
    expect(el.helperText).to.be.undefined;
    expect(el.hideLabel).to.be.false;
    expect(el.spellchecker).to.be.false;
    expect(el.characterCounter).to.be.false;
  });

  it('renders with custom attributes correctly', async () => {
    const name = 'name';
    const value = 'value';
    const label = 'label';
    const rows = 1;
    const placeholder = 'placeholder';
    const required = true;
    const minlength = 1;
    const maxlength = 10;
    const disabled = true;
    const readonly = true;
    const helperText = 'helperText';
    const hideLabel = true;
    const spellchecker = true;
    const characterCounter = true;

    const el = await fixture<Textarea>(html`
      <dfx-textarea
        name=${name}
        value=${value}
        label=${label}
        rows=${rows}
        placeholder=${placeholder}
        ?required=${required}
        minlength=${minlength}
        maxlength=${maxlength}
        ?disabled=${disabled}
        ?readonly=${readonly}
        helper-text=${helperText}
        ?hide-label=${hideLabel}
        ?spellchecker=${spellchecker}
        ?character-counter=${characterCounter}
      ></dfx-textarea>
    `);

    expect(el.name).to.equal(name);
    expect(el.value).to.equal(value);
    expect(el.label).to.equal(label);
    expect(el.rows).to.equal(rows);
    expect(el.placeholder).to.equal(placeholder);
    expect(el.required).to.equal(required);
    expect(el.minlength).to.equal(minlength);
    expect(el.maxlength).to.equal(maxlength);
    expect(el.disabled).to.equal(disabled);
    expect(el.readonly).to.equal(readonly);
    expect(el.helperText).to.equal(helperText);
    expect(el.hideLabel).to.equal(hideLabel);
    expect(el.spellchecker).to.equal(spellchecker);
    expect(el.characterCounter).to.equal(characterCounter);
  });

  it('fires dfx-input event on input', async () => {
    const el = await fixture<Textarea>(html` <dfx-textarea></dfx-textarea> `);
    const textarea = el.shadowRoot?.querySelector('textarea');

    setTimeout(() => {
      if (textarea) {
        textarea.value = 'value';
        textarea.dispatchEvent(new Event('input'));
      }
    });
    const ev = await oneEvent(el, 'dfx-input', false);

    expect(ev).to.exist;
    expect(ev.detail).to.equal('value');
  });

  it('fires dfx-change event on change', async () => {
    const el = await fixture<Textarea>(html` <dfx-textarea></dfx-textarea> `);
    const textarea = el.shadowRoot?.querySelector('textarea');

    setTimeout(() => {
      if (textarea) {
        textarea.value = 'value';
        textarea.dispatchEvent(new Event('change'));
      }
    });
    const ev = await oneEvent(el, 'dfx-change', false);

    expect(ev).to.exist;
    expect(ev.detail).to.equal('value');
  });

  it('fires dfx-invalid event on invalid', async () => {
    const el = await fixture<Textarea>(html`
      <dfx-textarea value="value" required></dfx-textarea>
    `);
    const textarea = el.shadowRoot?.querySelector('textarea');

    setTimeout(() => {
      if (textarea) {
        textarea.value = '';
        textarea.dispatchEvent(new Event('change'));
      }
    });
    const ev = await oneEvent(el, 'dfx-invalid', false);

    expect(ev).to.exist;
    expect(ev.detail.valid).to.be.false;
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<Textarea>(html` <dfx-textarea label="Label"></dfx-textarea> `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
