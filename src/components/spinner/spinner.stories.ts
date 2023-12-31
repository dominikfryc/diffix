import type { Meta, StoryObj } from '@storybook/web-components';
import { Spinner } from './spinner';
import { TemplateResult, html, nothing } from 'lit';

type Component = Spinner;

const meta: Meta<Component> = {
  title: 'Components/Spinner',
  component: 'dfx-spinner',
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
  },
  decorators: [story => html`<div style="display: grid; gap: 16px">${story()}</div>`],
};

export default meta;
type Story = StoryObj<Component>;

const SpinnerTemplate = (args: Partial<Component>): TemplateResult =>
  html`<dfx-spinner size=${args.size ?? nothing} label=${args.label ?? nothing}></dfx-spinner>`;

export const Default: Story = {
  render: args => SpinnerTemplate(args),
};

/**
 * Spinner has three sizes:
 * - `small`: used inside buttons
 * - `medium`: used for elements
 * - `large`: used for pages or sections
 *
 * Size can be overwritten by `--dfx-spinner-size` CSS variable.
 */
export const Sizes: Story = {
  render: args =>
    html`${SpinnerTemplate({ ...args, size: 'small' })}
    ${SpinnerTemplate({ ...args, size: 'medium' })} ${SpinnerTemplate({ ...args, size: 'large' })}`,
};

/**
 * Spinner can set a label to describe the action being processed.
 */
export const Label: Story = {
  render: args =>
    html`${SpinnerTemplate({ ...args, size: 'small', label: 'Loading...' })}
    ${SpinnerTemplate({ ...args, size: 'medium', label: 'Loading...' })}
    ${SpinnerTemplate({ ...args, size: 'large', label: 'Loading...' })}`,
};
