import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { CheckboxGroup } from './checkbox-group';

type Component = CheckboxGroup & {
  slot: string;
};

const meta: Meta<Component> = {
  title: 'Components/Checkbox Group',
  component: 'dfx-checkbox-group',
  tags: ['autodocs'],
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
  render: args =>
    html`<form onsubmit="submitForm(event)" style="display: grid; gap: 16px">
        ${CheckboxGroupTemplate(args)}
        <div style="display: flex; gap: 8px">
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
      </script>`,
};
