import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { CheckboxGroup } from './index.js';

type Component = CheckboxGroup & {
  slot: string;
  'helper-text': string;
};

const meta: Meta<Component> = {
  title: 'Components/Checkbox Group',
  component: 'dfx-checkbox-group',
  tags: ['autodocs'],
  argTypes: {
    helperText: {
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<Component>;

const CheckboxGroupTemplate = (args: Partial<Component>): TemplateResult =>
  html`<dfx-checkbox-group
    label=${args.label ?? nothing}
    value=${args.value ?? nothing}
    name=${args.name ?? nothing}
    ?required=${args.required}
    ?disabled=${args.disabled}
    helper-text=${args['helper-text'] ?? nothing}
  >
    ${unsafeHTML(args.slot)}
  </dfx-checkbox-group>`;

export const Default: Story = {
  args: {
    label: 'Checkbox group label',
    name: 'options',
    slot: `<dfx-checkbox value="1">Option 1</dfx-checkbox>
           <dfx-checkbox value="2">Option 2</dfx-checkbox>
           <dfx-checkbox value="3">Option 3</dfx-checkbox>`,
  },
  render: args => CheckboxGroupTemplate(args),
};

/**
 * Checkbox group can set initial `value` attribute with comma separated values of checked checkboxes.
 */
export const Value: Story = {
  args: {
    label: 'Checkbox group label',
    name: 'options',
    value: '1,2',
    slot: `<dfx-checkbox value="1">Option 1</dfx-checkbox>
           <dfx-checkbox value="2">Option 2</dfx-checkbox>
           <dfx-checkbox value="3">Option 3</dfx-checkbox>`,
  },
  render: args => CheckboxGroupTemplate(args),
};

/**
 * Checkbox group can set `disabled` attribute for disabling all checkboxes.
 */
export const Disabled: Story = {
  args: {
    label: 'Checkbox group label',
    name: 'options',
    disabled: true,
    slot: `<dfx-checkbox value="1">Option 1</dfx-checkbox>
           <dfx-checkbox value="2">Option 2</dfx-checkbox>
           <dfx-checkbox value="3">Option 3</dfx-checkbox>`,
  },
  render: args => CheckboxGroupTemplate(args),
};

/**
 * Checkbox group can show a helper text containing additional information. It disappears when there is an error.
 */
export const HelperText: Story = {
  args: {
    label: 'Checkbox group label',
    name: 'options',
    'helper-text': 'Helper text',
    slot: `<dfx-checkbox value="1">Option 1</dfx-checkbox>
           <dfx-checkbox value="2">Option 2</dfx-checkbox>
           <dfx-checkbox value="3">Option 3</dfx-checkbox>`,
  },
  render: args => CheckboxGroupTemplate(args),
};

/**
 * Checkbox group can set `required` attribute for validation.
 */
export const Required: Story = {
  args: {
    label: 'Checkbox group label',
    name: 'options',
    required: true,
    slot: `<dfx-checkbox value="1">Option 1</dfx-checkbox>
           <dfx-checkbox value="2">Option 2</dfx-checkbox>
           <dfx-checkbox value="3">Option 3</dfx-checkbox>`,
  },
  decorators: [
    story => html`
      <style>
        #checkbox-group-required {
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
      <div id="checkbox-group-required">${story()}</div>
    `,
  ],
  render: args => html`
    <form onsubmit="submitForm(event)">
      ${CheckboxGroupTemplate(args)}
      <div>
        <dfx-button type="submit" variant="filled">Submit</dfx-button>
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
