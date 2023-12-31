import type { Meta, StoryObj } from '@storybook/web-components';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { TemplateResult, html, nothing } from 'lit';
import { Button } from './button';

type Component = Button & {
  slot: string;
  start: string;
  end: string;
  'loading-text': string;
};

const meta: Meta<Component> = {
  title: 'Components/Button',
  component: 'dfx-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['filled', 'tonal', 'outlined', 'text'],
      control: { type: 'select' },
    },
    theme: {
      options: ['primary', 'neutral', 'success', 'danger'],
      control: { type: 'select' },
    },
    type: {
      options: ['button', 'submit', 'reset'],
      control: { type: 'select' },
    },
    loadingText: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<Component>;

const ButtonTemplate = (args: Partial<Component>): TemplateResult =>
  html`<dfx-button
    variant=${args.variant ?? nothing}
    theme=${args.theme ?? nothing}
    label=${args.label ?? nothing}
    ?disabled=${args.disabled}
    ?loading=${args.loading}
    loading-text=${args['loading-text'] ?? nothing}
    href=${args.href ?? nothing}
    target=${args.target ?? nothing}
    type=${args.type ?? nothing}
  >
    ${unsafeHTML(args.start)} ${unsafeHTML(args.slot)} ${unsafeHTML(args.end)}
  </dfx-button>`;

export const Default: Story = {
  args: {
    slot: 'Button',
  },
  render: args => ButtonTemplate(args),
};

/**
 * Button has four variants:
 * - `filled`: Dark background with light text.
 * - `tonal`: Light background with dark text.
 * - `outlined`: Transparent background with dark text and light gray outline.
 * - `text`: Transparent background with dark text.
 */
export const Variants: Story = {
  render: args =>
    html`${ButtonTemplate({ ...args, slot: 'Filled', variant: 'filled' })}
    ${ButtonTemplate({ ...args, slot: 'Tonal', variant: 'tonal' })}
    ${ButtonTemplate({ ...args, slot: 'Outlined', variant: 'outlined' })}
    ${ButtonTemplate({ ...args, slot: 'Text', variant: 'text' })}`,
};

/**
 * Button has four themes:
 * - `primary`: Blue is used for primary actions.
 * - `neutral`: Gray is used for non primary actions.
 * - `success`: Green is used for success actions.
 * - `danger`: Red is used for danger actions.
 */
export const Themes: Story = {
  args: {
    variant: 'filled',
  },
  render: args =>
    html`${ButtonTemplate({ ...args, slot: 'Primary', theme: 'primary' })}
    ${ButtonTemplate({ ...args, slot: 'Neutral', theme: 'neutral' })}
    ${ButtonTemplate({ ...args, slot: 'Success', theme: 'success' })}
    ${ButtonTemplate({ ...args, slot: 'Danger', theme: 'danger' })}`,
};

/**
 * Loading state is used when button is performing action with optional `loading-text`.
 */
export const Loading: Story = {
  args: {
    loading: true,
  },
  render: args =>
    html`${ButtonTemplate({ ...args, slot: 'Button', variant: 'filled' })}
    ${ButtonTemplate({ ...args, slot: 'Button', variant: 'tonal', 'loading-text': 'Loading...' })}
    ${ButtonTemplate({
      ...args,
      slot: 'Button',
      variant: 'outlined',
      'loading-text': '',
      label: 'Label',
    })}`,
};

/**
 * Disabled state is used when button is not available for interaction.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: args =>
    html`${ButtonTemplate({ ...args, slot: 'Filled', variant: 'filled' })}
    ${ButtonTemplate({ ...args, slot: 'Tonal', variant: 'tonal' })}
    ${ButtonTemplate({ ...args, slot: 'Outlined', variant: 'outlined' })}
    ${ButtonTemplate({ ...args, slot: 'Text', variant: 'text' })}`,
};

/**
 * Setting attribute `href` renders button as link with optional `target`.
 */
export const Link: Story = {
  args: {
    href: 'https://google.com',
  },
  render: args =>
    html`${ButtonTemplate({ ...args, slot: 'This tab', variant: 'filled' })}
    ${ButtonTemplate({ ...args, slot: 'New tab', variant: 'outlined', target: '_blank' })}`,
};

const iconPlus =
  '<svg slot="start" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>';
const iconDown =
  '<svg slot="end" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>';
const iconStar =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>';

/**
 * Button has three slots:
 * - `(default)`: Default slot for button content.
 * - `start`: Optional slot for content before button content.
 * - `end`: Optional slot for content after button content.
 *
 * If default slot is not set or it does not contain text, attribute `label` should be set for accessibility.
 */
export const Slots: Story = {
  decorators: [story => html`<div style="display: flex; gap: 4px">${story()}</div>`],
  render: args =>
    html`${ButtonTemplate({ ...args, slot: 'Create', start: iconPlus, variant: 'filled' })}
    ${ButtonTemplate({ ...args, slot: 'Dropdown', end: iconDown })}
    ${ButtonTemplate({ ...args, slot: iconStar, variant: 'tonal', label: 'Star button' })}`,
};

/**
 * Button has three types:
 * - `button`: Default option does not have any specific behavior.
 * - `reset`: Resets parent form with all its inputs.
 * - `submit`: Submits parent form if all its inputs are valid.
 */
export const Form: Story = {
  render: args =>
    html`<form onsubmit="submitForm(event)" style="display: flex; gap: 4px">
        <dfx-input name="text" label="Label" hide-label></dfx-input>
        ${ButtonTemplate({ ...args, type: 'reset', slot: 'Reset' })}
        ${ButtonTemplate({ ...args, type: 'submit', slot: 'Submit', variant: 'filled' })}
      </form>

      <script>
        var submitForm = event => {
          event.preventDefault();
          const formData = new FormData(event.target);
          alert('The value is "' + formData.get('text') + '"');
        };
      </script>`,
};
