import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { Alert } from './alert.js';

describe('Alert', () => {
  it('is defined', () => {
    const el = document.createElement('dfx-alert');

    expect(el).to.be.instanceOf(Alert);
  });

  it('renders with default values', async () => {
    const el = await fixture<Alert>(html` <dfx-alert></dfx-alert> `);

    expect(el.closable).to.be.false;
    expect(el.hidden).to.be.false;
    expect(el.theme).to.equal('neutral');
    expect(el.hideIcon).to.be.false;
  });

  it('renders with custom attributes correctly', async () => {
    const closable = true;
    const hidden = true;
    const theme = 'primary';
    const hideIcon = true;

    const el = await fixture<Alert>(html`
      <dfx-alert
        ?closable=${closable}
        ?hidden=${hidden}
        theme=${theme}
        ?hide-icon=${hideIcon}
      ></dfx-alert>
    `);

    expect(el.closable).to.equal(closable);
    expect(el.hidden).to.equal(hidden);
    expect(el.theme).to.equal(theme);
    expect(el.hideIcon).to.equal(hideIcon);
  });

  it('fires dfx-close event when close button is clicked', async () => {
    const el = await fixture<Alert>(html` <dfx-alert closable></dfx-alert> `);
    const button = el.shadowRoot?.querySelector('dfx-button');

    setTimeout(() => button?.click());
    const ev = await oneEvent(el, 'dfx-close', false);

    expect(ev).to.exist;
    expect(ev.detail.type).to.equal('click');
  });

  it('hides alert when close button is clicked', async () => {
    const el = await fixture<Alert>(html` <dfx-alert closable></dfx-alert> `);
    const button = el.shadowRoot?.querySelector('dfx-button');

    button?.click();

    expect(el.hidden).to.be.true;
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<Alert>(html` <dfx-alert></dfx-alert> `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
