import type { Meta, StoryObj } from '@storybook/web-components';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { TemplateResult, html, nothing } from 'lit';
import { Alert } from './alert';

type Component = Alert & {
  slot: string;
  icon: string;
  'hide-icon': boolean;
};

const meta: Meta<Component> = {
  title: 'Components/Alert',
  component: 'dfx-alert',
  tags: ['autodocs'],
  argTypes: {
    theme: {
      options: ['primary', 'neutral', 'success', 'danger'],
      control: { type: 'select' },
    },
    hideIcon: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<Component>;

const AlertTemplate = (args: Partial<Component>): TemplateResult =>
  html`<dfx-alert
    ?closable=${args.closable}
    ?hidden=${args.hidden}
    theme=${args.theme ?? nothing}
    ?hide-icon=${args['hide-icon']}
  >
    ${unsafeHTML(args.icon)} ${unsafeHTML(args.slot)}
  </dfx-alert>`;

export const Default: Story = {
  args: {
    slot: 'This is an alert',
  },
  render: args => AlertTemplate(args),
};

/**
 * Alert can be closable, it renders close button which hides whole component on click.
 */
export const Closable: Story = {
  args: {
    slot: 'This is an alert',
    closable: true,
  },
  render: args => AlertTemplate(args),
};

/**
 * Alert has four themes:
 * - `primary`: Blue is used for informative content.
 * - `neutral`: Gray is used for neutral content.
 * - `success`: Green is used for success content.
 * - `danger`: Red is used for danger content.
 */
export const Themes: Story = {
  args: {
    closable: true,
  },
  render: args =>
    html`${AlertTemplate({
        ...args,
        theme: 'primary',
        slot: 'This is a primary alert',
      })}<br />
      ${AlertTemplate({ ...args, theme: 'neutral', slot: 'This is a neutral alert' })}<br />
      ${AlertTemplate({ ...args, theme: 'success', slot: 'This is a success alert' })}<br />
      ${AlertTemplate({ ...args, theme: 'danger', slot: 'This is a danger alert' })}`,
};

/**
 * Icon can be hidden by attribute.
 */
export const HideIcon: Story = {
  args: {
    slot: 'This is an alert',
    'hide-icon': true,
    closable: true,
  },
  render: args => AlertTemplate(args),
};

/**
 * Alert can be extended by slots:
 * - `(default)`: Content of alert (if multiple items are provided, they are stacked vertically).
 * - `icon`: Custom icon can be provided.
 */
export const Slots: Story = {
  args: {
    closable: true,
  },
  render: args =>
    html`${AlertTemplate({
      ...args,
      theme: 'success',
      slot: `<div>
               <strong>Generation finished successfully</strong><br>
               <span>All files has been created and they are ready to be used in the project.</span>
             </div>
             <dfx-button variant="filled" theme="success">Show result</dfx-button>`,
      icon: '<svg slot="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    })}`,
};
