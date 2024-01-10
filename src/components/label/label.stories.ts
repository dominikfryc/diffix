import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Label } from './label.js';

type Component = Label & {
  slot: string;
};

const meta: Meta<Component> = {
  title: 'Components/Label',
  component: 'dfx-label',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<Component>;

const LabelTemplate = (args: Partial<Component>): TemplateResult =>
  html`<dfx-label type=${args.type ?? nothing}> ${unsafeHTML(args.slot)} </dfx-label>`;

export const Default: Story = {
  args: {
    slot: 'Label',
  },
  render: args => LabelTemplate(args),
};

/**
 * Label has three types:
 * - `control`: Label for form control.
 * - `error`: Label for error message.
 * - `helper`: Label for helper message.
 */
export const Types: Story = {
  decorators: [story => html`<div style="display: grid; gap: 1rem">${story()}</div>`],
  render: args => html`
    ${LabelTemplate({ ...args, slot: 'Control label', type: 'control' })}
    ${LabelTemplate({ ...args, slot: 'Error label', type: 'error' })}
    ${LabelTemplate({ ...args, slot: 'Helper label', type: 'helper' })}
  `,
};
