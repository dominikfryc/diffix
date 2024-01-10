import type { Meta, StoryObj } from '@storybook/web-components';
import { TemplateResult, html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Checkbox } from './checkbox.js';

type Component = Checkbox & {
  slot: string;
  'helper-text': string;
};

const meta: Meta<Component> = {
  title: 'Components/Checkbox',
  component: 'dfx-checkbox',
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['checkbox', 'switch'],
      control: { type: 'radio' },
    },
    helperText: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<Component>;

const CheckboxTemplate = (args: Partial<Component>): TemplateResult =>
  html`<dfx-checkbox
    ?checked=${args.checked}
    name=${args.name ?? nothing}
    value=${args.value ?? nothing}
    type=${args.type ?? nothing}
    ?required=${args.required}
    ?disabled=${args.disabled}
    helper-text=${args['helper-text'] ?? nothing}
  >
    ${unsafeHTML(args.slot)}
  </dfx-checkbox>`;

export const Default: Story = {
  args: {
    slot: 'Checkbox',
    value: 'value',
  },
  render: args => CheckboxTemplate(args),
};

/**
 * Checkbox have two types:
 * - `checkbox`: Regular checkbox input.
 * - `switch`: Horizontal switch input.
 */
export const Type: Story = {
  args: {
    value: 'value',
  },
  decorators: [story => html`<div style="display: grid; gap: 0.5rem">${story()}</div>`],
  render: args => html`
    ${CheckboxTemplate({ ...args, slot: 'Checkbox', type: 'checkbox' })}
    ${CheckboxTemplate({ ...args, slot: 'Switch', type: 'switch' })}
  `,
};

/**
 * Checkbox can be checked.
 */
export const Checked: Story = {
  args: {
    value: 'value',
    checked: true,
  },
  decorators: [story => html`<div style="display: grid; gap: 0.5rem">${story()}</div>`],
  render: args => html`
    ${CheckboxTemplate({ ...args, slot: 'Checkbox', type: 'checkbox' })}
    ${CheckboxTemplate({ ...args, slot: 'Switch', type: 'switch' })}
  `,
};

/**
 * Checkbox can be disabled.
 */
export const Disabled: Story = {
  args: {
    value: 'value',
    disabled: true,
  },
  decorators: [story => html`<div style="display: grid; gap: 0.5rem">${story()}</div>`],
  render: args => html`
    ${CheckboxTemplate({ ...args, slot: 'Unchecked', type: 'checkbox' })}
    ${CheckboxTemplate({ ...args, slot: 'Checked', type: 'checkbox', checked: true })}
    ${CheckboxTemplate({ ...args, slot: 'Unchecked', type: 'switch' })}
    ${CheckboxTemplate({ ...args, slot: 'Checked', type: 'switch', checked: true })}
  `,
};

/**
 * Checkbox can set `helper-text` attribute for additional information.
 */
export const HelperText: Story = {
  args: {
    value: 'value',
    'helper-text': 'Additional information',
  },
  decorators: [story => html`<div style="display: grid; gap: 1rem">${story()}</div>`],
  render: args =>
    html`${CheckboxTemplate({ ...args, slot: 'Checkbox', type: 'checkbox' })}
    ${CheckboxTemplate({ ...args, slot: 'Switch', type: 'switch' })}`,
};

/**
 * Checkbox can set `required` attribute for validation.
 */
export const Required: Story = {
  args: {
    value: 'value',
    required: true,
  },
  decorators: [
    story => html`
      <style>
        #checkbox-required {
          form {
            display: grid;
            gap: 1rem;

            div {
              display: flex;
              gap: 0.5rem;
            }
          }
        }
      </style>
      <div id="checkbox-required">${story()}</div>
    `,
  ],
  render: args => html`
    <form onsubmit="submitForm(event)">
      ${CheckboxTemplate({ ...args, slot: 'Checkbox', type: 'checkbox' })}
      ${CheckboxTemplate({ ...args, slot: 'Switch', type: 'switch' })}
      <div>
        <dfx-button type="submit" variant="filled">Check</dfx-button>
        <dfx-button type="reset">Reset</dfx-button>
      </div>
    </form>

    <script>
      var submitForm = event => {
        event.preventDefault();
        if (event.target.checkValidity()) {
          alert('Form is valid');
        }
      };
    </script>
  `,
};
