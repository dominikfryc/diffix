import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Radio } from './radio.js';

type Component = Radio & {
  slot: string;
  'helper-text': string;
};

const meta: Meta<Component> = {
  title: 'Components/Radio',
  component: 'dfx-radio',
  tags: ['autodocs'],
  argTypes: {
    helperText: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<Component>;

const RadioTemplate = (args: Partial<Component>): TemplateResult =>
  html`<dfx-radio
    ?checked=${args.checked}
    value=${args.value ?? nothing}
    ?disabled=${args.disabled}
    helper-text=${args['helper-text'] ?? nothing}
  >
    ${unsafeHTML(args.slot)}
  </dfx-radio>`;

export const Default: Story = {
  args: {
    slot: 'Radio',
    value: 'value',
  },
  render: args => RadioTemplate(args),
};

/**
 * Radio can be checked.
 */
export const Checked: Story = {
  args: {
    slot: 'Radio',
    value: 'value',
    checked: true,
  },
  render: args => RadioTemplate(args),
};

/**
 * Radio can be disabled.
 */
export const Disabled: Story = {
  args: {
    value: 'value',
    disabled: true,
  },
  decorators: [story => html`<div style="display: grid; gap: 0.5rem">${story()}</div>`],
  render: args => html`
    ${RadioTemplate({ ...args, slot: 'Unchecked', checked: false })}
    ${RadioTemplate({ ...args, slot: 'Checked', checked: true })}
  `,
};

/**
 * Radio can set `helper-text` attribute for additional information.
 */
export const HelperText: Story = {
  args: {
    slot: 'Radio',
    value: 'value',
    'helper-text': 'Additional information',
  },
  render: args => RadioTemplate(args),
};
