import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { RadioGroup } from './radio-group';

type Component = RadioGroup & {
  slot: string;
};

const meta: Meta<Component> = {
  title: 'Components/Radio Group',
  component: 'dfx-radio-group',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<Component>;

const RadioGroupTemplate = (args: Partial<Component>): TemplateResult =>
  html`<dfx-radio-group
    label=${args.label ?? nothing}
    value=${args.value ?? nothing}
    name=${args.name ?? nothing}
    ?required=${args.required}
    ?disabled=${args.disabled}
  >
    ${unsafeHTML(args.slot)}
  </dfx-radio-group>`;

export const Default: Story = {
  args: {
    label: 'Radio group label',
    name: 'options',
    slot: `<dfx-radio value="1">Option 1</dfx-radio>
           <dfx-radio value="2">Option 2</dfx-radio>
           <dfx-radio value="3">Option 3</dfx-radio>`,
  },
  render: args => RadioGroupTemplate(args),
};

/**
 * Radio group can set initial `value` attribute with value of checked radio.
 */
export const Value: Story = {
  args: {
    label: 'Radio group label',
    name: 'options',
    value: '1',
    slot: `<dfx-radio value="1">Option 1</dfx-radio>
           <dfx-radio value="2">Option 2</dfx-radio>
           <dfx-radio value="3">Option 3</dfx-radio>`,
  },
  render: args => RadioGroupTemplate(args),
};

/**
 * Radio group can set `disabled` attribute for disabling all radios.
 */
export const Disabled: Story = {
  args: {
    label: 'Radio group label',
    name: 'options',
    disabled: true,
    slot: `<dfx-radio value="1">Option 1</dfx-radio>
           <dfx-radio value="2">Option 2</dfx-radio>
           <dfx-radio value="3">Option 3</dfx-radio>`,
  },
  render: args => RadioGroupTemplate(args),
};

/**
 * Radio group can set `required` attribute for validation.
 */
export const Required: Story = {
  args: {
    label: 'Radio group label',
    name: 'options',
    required: true,
    slot: `<dfx-radio value="1">Option 1</dfx-radio>
           <dfx-radio value="2">Option 2</dfx-radio>
           <dfx-radio value="3">Option 3</dfx-radio>`,
  },
  render: args =>
    html`<form onsubmit="submitForm(event)" style="display: grid; gap: 16px">
        ${RadioGroupTemplate(args)}
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
